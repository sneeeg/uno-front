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
                                        label="Question"
                                        v-model="currentFaq.question"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Priority (sorting)"
                                        v-model="currentFaq.priority"
                                        hide-details
                                        class="col-4 px-0 mt-5"
                                    ></v-text-field>
                                    <v-select
                                        :items="FaqCategories"
                                        v-model="currentFaq.category"
                                        item-text="name"
                                        label="Categories"
                                        dense
                                        class="col-4 px-0 mt-5"
                                    >
                                    </v-select>
                                </div>
                                <div class="col-12">
                                    <h6>Answer</h6>
                                    <editor
                                        api-key="no-api-key"
                                        v-model="currentFaq.answer"
                                        :init="{
                                             height: 200,
                                             menubar: false,
                                             plugins: []
                                       }"/>
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


@Component({
    components: { PageHeader, StandartTemplate, Editor },
})

export default class EditQuestion extends Vue {

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
        answer: '',
        question: '',
        publish: true,
        priority: '',
        category: undefined
    }

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const response = await ApiFaq.UpdateFaqInfo(
                this.currentFaq.answer,
                this.currentFaq.question,
                this.currentFaq.priority,
                this.currentFaq.publish? 1: 0,
                this.currentFaq.category,
                ApiEnter.CurrentSessionUUID,
                this.CurrentFaqUUID);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: `Faq has updated!`,
                    icon: "success"
                }).then(() => {
                    this.$forceUpdate()
                    this.currentFaq.answer = ''
                    this.currentFaq.question = ''
                    this.currentFaq.priority = ''
                    this.currentFaq.publish = true
                    this.currentFaq.category = ''
                    this.$router.push(`/faq/questions`);
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
            this.FaqCategories = await ApiFaq.GetFaqCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private async GetFaqInfo(): Promise<void> {
        const faqInfo: any | null = await ApiFaq.GetFaqByUUID(ApiEnter.CurrentSessionUUID as string, this.CurrentFaqUUID);
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
        this.currentFaq.answer = faqInfo.answer
        this.currentFaq.question = faqInfo.question
        this.currentFaq.publish = faqInfo.publish
        this.currentFaq.priority = faqInfo.priority
        this.currentFaq.category = faqInfo.category
    }

    public mounted(): void {
        this.CurrentFaqUUID = this.$route.params.faq_uuid;
        this.GetFaqCategories()
        this.GetFaqInfo()
    }
}
</script>
