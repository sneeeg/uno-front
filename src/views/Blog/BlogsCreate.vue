<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Posts" back-url="/company/list/"/>
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
                                        v-model="PostPublish"
                                        label="Publish"
                                        hide-details
                                        class="mt-10"
                                    ></v-switch>
                                    <v-text-field
                                        label="Post name"
                                        v-model="PostName"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Post image"
                                        v-model="PostImage"
                                        hide-details
                                        class="col-4 px-0 mt-5"
                                    ></v-text-field>
                                </div>
                                <div class="col-12">
                                    <editor
                                        api-key="no-api-key"
                                        v-model="BlogContent"
                                        :init="{
                                             height: 200,
                                             menubar: false,
                                             plugins: []
                                       }"/>
                                </div>
                                <div class="col-12">
                                    <v-divider></v-divider>
                                </div>
                                <div class="col-12">
                                    <h5 class="font-weight-medium">SEO Section</h5>
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        height="100"
                                        no-resize
                                        hide-details
                                        class="col-5 px-0 mt-10"
                                        label="Description"
                                        value=""
                                    ></v-textarea>
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        height="100"
                                        no-resize
                                        hide-details
                                        class="col-5 px-0 mt-5"
                                        label="Keywords"
                                        value=""
                                    ></v-textarea>
                                    <v-text-field
                                        label="URL"
                                        hide-details
                                        class="col-5 px-0 mt-5"
                                    ></v-text-field>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 px-6">
                            <div class="col-12 py-6 bg-light">
                                <router-link to="/admin/blog">
                                    <v-btn
                                        color="grey lighten-1"
                                        class="white--text col-1 ml-2"
                                        small
                                        depressed>
                                        Cancel
                                    </v-btn>
                                </router-link>
                                <v-btn
                                    color="orange accent-4"
                                    class="white--text col-1 ml-4"
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
import ApiBlog from "@/api/ApiBlog";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import Editor from '@tinymce/tinymce-vue'


@Component({
    components: { PageHeader, StandartTemplate, Editor },
})

export default class BlogCreate extends Vue {

    public Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: '/',
            text: 'Home'
        },
        {
            to: '/admin/blog',
            text: 'CMS'
        },
        {
            text: 'Blog',
            disabled: true
        }
    ];

    private PostName: string= ''
    private PostImage: string= ''
    private PostPublish: boolean = true
    private BlogContent: string = ''

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const blog_uuid = await ApiBlog.CreateBlog(
                ApiEnter.CurrentSessionUUID,
                this.PostName,
                this.PostPublish? 1: 0,
                this.PostImage,
                this.BlogContent);
            if (blog_uuid == undefined || blog_uuid.length != 36) {
                await sweetalert({
                    title: "Ошибка запроса!",
                    text: "Ошибка создания Blog: " + blog_uuid,
                    icon: "info"
                });
                return;
            }

            sweetalert({
                title: "Успех!",
                text: `Blog успешно создан!`,
                icon: "success"
            }).then(() => {
                this.$forceUpdate()
                this.$router.push(`/admin/blog`);
            })
        }
    }
}
</script>
