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
                                    <v-switch
                                        v-model="newPost.publish"
                                        label="Publish"
                                        hide-details
                                        class="mt-10"
                                    ></v-switch>
                                    <v-text-field
                                        label="File name"
                                        v-model="newPost.name"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="File description"
                                        v-model="newPost.description"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-select
                                        :items="FaqCategories"
                                        v-model="newPost.category"
                                        item-text="name"
                                        label="Category"
                                        dense
                                        hide-details
                                        class="col-4 px-0 mt-5"
                                    >
                                    </v-select>
                                    <v-text-field
                                        label="File link"
                                        v-model="newPost.file"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Priority (sorting)"
                                        v-model="newPost.priority"
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

export default class FilesCreate extends Vue {

    public Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: '/',
            text: 'Home'
        },
        {
            to: '/admin',
            text: 'CMS'
        },
        {
            to: '/cms/files',
            text: 'Support (Files)'
        },
        {
            text: 'Files',
            disabled: true
        }
    ];

    private FaqCategories: any = []

    private newPost: any = {
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

            const blog_uuid = await ApiSupportFiles.CreateFile(
                ApiEnter.CurrentSessionUUID,
                this.newPost.name,
                this.newPost.description,
                this.newPost.category,
                this.newPost.file,
                this.newPost.priority,
                this.newPost.publish? 1: 0);
            if (blog_uuid == undefined || blog_uuid.length != 36) {
                sweetalert({
                    title: "Request error!",
                    text: "Creation error File: " + blog_uuid,
                    icon: "info"
                });
                return;
            }

            sweetalert({
                title: "Success!",
                text: `Post has created!`,
                icon: "success"
            }).then(() => {
                this.$forceUpdate()
                this.newPost.name = ''
                this.newPost.description = ''
                this.newPost.priority = ''
                this.newPost.file = ''
                this.newPost.publish = true
                this.newPost.category = ''
                this.$router.push(`/cms/files`);
            })
        }
    }

    private async GetFaqCategories(): Promise<void> {
        try {
            this.FaqCategories = await ApiSupportFiles.GetFilesCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    public created(): void {
        this.GetFaqCategories()
    }
}
</script>
