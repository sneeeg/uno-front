<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Support (Files)" back-url="/company/list/"/>
                <div class="col-12 mt-5">
                    <router-link to="/cms/files">
                        <v-btn depressed small color="light-blue darken-4" class="white--text">
                            Files
                        </v-btn>
                    </router-link>
                    <router-link to="/cms/files/categories" class="ml-3">
                        <v-btn depressed small color="white">
                            Categories
                        </v-btn>
                    </router-link>
                </div>
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
                                    <div class="d-flex mt-6">
                                        <span class="font-weight-medium">Created</span>
                                        <p class="ml-10 mb-0">{{ currentFile.created }}</p>
                                    </div>
                                    <v-switch
                                        v-model="currentFile.publish"
                                        inset
                                        label="Publish"
                                        hide-details
                                        class="mt-10"
                                    ></v-switch>
                                    <v-text-field
                                        label="File name"
                                        v-model="currentFile.name"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="File description"
                                        v-model="currentFile.description"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-select
                                        :items="FaqCategories"
                                        v-model="currentFile.category"
                                        item-text="name"
                                        item-value="uuid"
                                        label="Category"
                                        dense
                                        hide-details
                                        class="col-4 px-0 mt-5"
                                    >
                                    </v-select>
                                    <v-row class="mt-5 d-flex align-center">
                                        <v-col cols="4">
                                            <v-file-input
                                                show-size
                                                label="File input"
                                                v-model="currentFile.file"
                                                hide-details
                                            ></v-file-input>
                                        </v-col>
                                        <v-col>
                                            <button
                                                @click="DownloadFile"
                                                class="mt-3 pa-2"
                                            >
                                                Download file
                                            </button>
                                        </v-col>
                                    </v-row>
                                    <v-text-field
                                        label="Priority (sorting)"
                                        v-model="currentFile.priority"
                                        type="number"
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
                                <router-link to="/cms/files">
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
                                    :disabled="currentFile.name === '' || currentFile.description === '' || !currentFile.category || currentFile.priority === '' || !currentFile.file"
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
import dayjs from "dayjs";
import ApiAdmin from "@/api/ApiAdmin";


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
            to: '/cms/files',
            exact: true,
            text: 'CMS'
        },
        {
            to: '/cms/files',
            exact: true,
            text: 'Support (Files)'
        },
        {
            text: 'Files',
            disabled: true
        }
    ];

    private currentFileUUID!: string

    private FaqCategories: any = []

    private currentFile: any = {
        name: '',
        description: '',
        publish: true,
        priority: '',
        file: null,
        file_name: null,
        category: undefined,
        created: ''
    }

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const file_name = await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID, this.currentFile.file)

            if (file_name) {
                const response = await ApiSupportFiles.UpdateFileInfo(
                    this.currentFile.name,
                    this.currentFile.description,
                    this.currentFile.category,
                    file_name,
                    this.currentFile.priority,
                    this.currentFile.publish? 1: 0,
                    ApiEnter.CurrentSessionUUID,
                    this.currentFileUUID);
                if (typeof response == "boolean") {
                    sweetalert({
                        title: "Success!",
                        text: `File has updated!`,
                        icon: "success"
                    }).then(() => {
                        this.$forceUpdate()
                        this.currentFile.name = ''
                        this.currentFile.description = ''
                        this.currentFile.priority = ''
                        this.currentFile.file = ''
                        this.currentFile.publish = true
                        this.currentFile.category = ''
                        this.currentFile.created = ''
                        this.$router.push(`/cms/files`);
                    })
                } else {
                    await sweetalert({
                        title: "Request error!",
                        text: "Error",
                        icon: "info"
                    });
                }
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
        const faqInfo: any | null = await ApiSupportFiles.GetFileByUUID(ApiEnter.CurrentSessionUUID as string, this.currentFileUUID);
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
        this.currentFile.name = faqInfo.name
        this.currentFile.description = faqInfo.description
        this.currentFile.publish = faqInfo.publish
        this.currentFile.priority = faqInfo.priority
        this.currentFile.category = faqInfo.category
        this.currentFile.file_name = faqInfo.file
        this.currentFile.created = dayjs(faqInfo.create_at).format('DD.MM.YYYY HH:mm')
        await this.GetFile(faqInfo.file)
    }

    private async GetFile(file_name: string): Promise<void> {
        await ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, file_name)
            .then((response) => {
            this.currentFile.file = new File([new Blob([response.data])], file_name.split('/')[8])
        })
    }

    private async DownloadFile(): Promise<void> {
        await ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, this.currentFile.file_name).then((response) => {
            let a = document.createElement("a")
            let file = new Blob([response])
            a.href = URL.createObjectURL(file);
            a.download = this.currentFile.file_name.split('/')[8];
            a.click();
        })
    }

    public mounted(): void {
        this.currentFileUUID = this.$route.params.file_uuid;
        this.GetFaqCategories()
        this.GetFaqInfo()
    }
}
</script>
