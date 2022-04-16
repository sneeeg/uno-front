<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Support (FAQ)" back-url="/company/list/"/>
                <div class="col-12 px-6">
                    <v-divider></v-divider>
                </div>
                <h6 class="px-6 font-weight-bold text-uppercase">Edit</h6>
                <div class="col-12">
                    <div class="well mb-0">
                        <div class="well-wrapper">
                            <div class="row">
                                <div class="col-12">
                                    <h5 class="font-weight-medium">Main information</h5>
                                    <v-switch
                                        v-model="currentFaq.publish"
                                        label="Publish"
                                        hide-details
                                        class="mt-10"
                                    ></v-switch>
                                    <v-text-field
                                        label="File name"
                                        v-model="currentFaq.name"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="File description"
                                        v-model="currentFaq.description"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-select
                                        :items="FaqCategories"
                                        v-model="currentFaq.category"
                                        item-text="name"
                                        label="Category"
                                        dense
                                        hide-details
                                        class="col-4 px-0 mt-5"
                                    >
                                    </v-select>
                                    <v-text-field
                                        label="File link"
                                        v-model="currentFaq.file"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Priority (sorting)"
                                        v-model="currentFaq.priority"
                                        hide-details
                                        class="col-4 px-0 mt-5"
                                    ></v-text-field>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 px-6">
                            <div class="col-12 py-6 bg-light d-flex">
                                <router-link to="/faq/questions">
                                    <v-btn
                                        color="grey lighten-1"
                                        class="white--text"
                                        small
                                        depressed>
                                        Cancel
                                    </v-btn>
                                </router-link>
                                <v-btn
                                    color="orange accent-4"
                                    class="white--text ml-2"
                                    small
                                    @click="OnClickSubmit()"
                                    depressed>
                                    Save
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </standart-template>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import sweetalert from "sweetalert";
import ApiEnter from "@/api/ApiEnter";
import ApiFaq from "@/api/ApiFaq";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import Editor from '@tinymce/tinymce-vue'
import ApiSupportFiles from "@/api/ApiSupportFiles";


@Component({
    components: { PageHeader, StandartTemplate, Editor },
})

export default class FilesEdit extends Vue {

    public Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: '/',
            text: 'Home'
        },
        {
            to: '/faq/question',
            text: 'CMS'
        },
        {
            to: '/faq/question',
            text: 'Support (FAQ)'
        },
        {
            text: 'Questions',
            disabled: true
        }
    ];

    private CurrentFaqUUID!: string

    private FaqCategories: any = []

    private currentFaq: any = {
        name: '',
        description: '',
        publish: true,
        priority: '',
        file: '',
        category: undefined
    }

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const response = await ApiSupportFiles.UpdateFileInfo(
                this.currentFaq.name,
                this.currentFaq.description,
                this.currentFaq.category,
                this.currentFaq.file,
                this.currentFaq.priority,
                this.currentFaq.publish? 1: 0,
                ApiEnter.CurrentSessionUUID,
                this.CurrentFaqUUID);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: `File has updated!`,
                    icon: "success"
                }).then(() => {
                    this.$forceUpdate()
                    this.currentFaq.name = ''
                    this.currentFaq.description = ''
                    this.currentFaq.priority = ''
                    this.currentFaq.file = ''
                    this.currentFaq.publish = true
                    this.currentFaq.category = ''
                    this.$router.push(`/cms/files`);
                })
            } else {
                await sweetalert({
                    title: "Request error!",
                    text: "Ошибка",
                    icon: "info"
                });
            }
        }
    }

    private async GetFaqCategories(): Promise<void> {
        try {
            this.FaqCategories = await ApiSupportFiles.GetFilesCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private async GetFaqInfo(): Promise<void> {
        const faqInfo: any | null = await ApiSupportFiles.GetFileByUUID(ApiEnter.CurrentSessionUUID as string, this.CurrentFaqUUID);
        if (faqInfo == undefined) {
            sweetalert({
                title: "Упс!",
                text: "Компания по вашему запросу - отсуствует!",
                icon: "error"
            }).then(() => {
                this.$router.push("/");
            });
            return;
        }
        this.currentFaq.name = faqInfo.name
        this.currentFaq.description = faqInfo.description
        this.currentFaq.publish = faqInfo.publish
        this.currentFaq.priority = faqInfo.priority
        this.currentFaq.category = faqInfo.category
        this.currentFaq.file = faqInfo.file
    }

    public mounted(): void {
        this.CurrentFaqUUID = this.$route.params.file_uuid;
        this.GetFaqCategories()
        this.GetFaqInfo()
    }
}
</script>
