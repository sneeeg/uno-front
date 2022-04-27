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
                                    <div class="d-flex mt-6">
                                        <span class="font-weight-medium">Created</span>
                                        <p class="ml-10 mb-0">{{ PostCreated }}</p>
                                    </div>
                                    <v-switch
                                        v-model="PostPublish"
                                        label="Publish"
                                        inset
                                        hide-details
                                        class="mt-9"
                                    ></v-switch>
                                    <v-text-field
                                        label="Post name"
                                        v-model="PostName"
                                        hide-details
                                        @input="GenerateSeoUrl"
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-col cols="4" class="px-0">
                                        <v-select
                                            :items="CardDesignData"
                                            v-model="BlogCardDesign"
                                            label="Card design"
                                            hide-details
                                            outlined
                                        ></v-select>
                                    </v-col>
                                    <v-col>
                                        <v-row class="mt-5">
                                            <v-text-field
                                                label="Post image size1"
                                                v-model="PostImage1"
                                                hide-details
                                                class="col-4 px-0"
                                            ></v-text-field>
                                            <v-text-field
                                                label="Post image size2"
                                                v-model="PostImage2"
                                                hide-details
                                                class="col-4 px-0 ml-7"
                                            ></v-text-field>
                                        </v-row>
                                    </v-col>
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
                                        v-model="BlogSeoDescription"
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
                                        v-model="BlogSeoKeywords"
                                        value=""
                                    ></v-textarea>
                                    <v-text-field
                                        label="URL"
                                        v-model="BlogSeoUrl"
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
                                    :disabled="PostName === '' || BlogContent === '' ||  BlogCardDesign === ''"
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
import dayjs from "dayjs";


@Component({
    components: { PageHeader, StandartTemplate, Editor },
})

export default class BlogEdit extends Vue {

    public Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: '/',
            text: 'Главная'
        },
        {
            to: '/admin/blog',
            text: 'Blog',
            disabled: false
        },
        {
            text: 'Blog Edit',
            disabled: true
        }
    ];
    private CardDesignData: string[] = ['Blue', 'Orange', 'White', 'With image']

    private CurrentBlogUUID!: string;
    private PostPublish: boolean = true
    private PostName: string= ''
    private PostImage1: string= ''
    private PostImage2: string= ''
    private BlogCardDesign: string = ''
    private BlogContent: string = ''
    private BlogSeoDescription: string = ''
    private BlogSeoKeywords: string = ''
    private BlogSeoUrl: string = ''
    private PostCreated: string= ''

    public mounted() {
        this.CurrentBlogUUID = this.$route.params.blog_uuid;
        this.DoLoadForm();
    }

    private GenerateSeoUrl() {
        this.BlogSeoUrl = this.PostName.replace(/ /ig, '-').toLowerCase()
    }

    private async DoLoadForm(): Promise<void> {

        const blogInfo: any = await ApiBlog.GetBlogByUUID(ApiEnter.CurrentSessionUUID as string, this.CurrentBlogUUID);
        if (blogInfo == undefined) {
            sweetalert({
                title: "Упс!",
                text: "Во время загрузки информации - возникла ошибка, не все данные были заружены!",
                icon: "error"
            }).then(() => {
                this.$router.go(-1);
            });
            return;
        }

        this.PostName = blogInfo.title
        this.PostImage1 = blogInfo.image1
        this.PostImage2 = blogInfo.image2
        this.BlogCardDesign = blogInfo.card_design
        this.PostPublish = blogInfo.publish
        this.BlogContent = blogInfo.content
        this.BlogSeoDescription = blogInfo.seo_description
        this.BlogSeoKeywords = blogInfo.seo_keywords
        this.BlogSeoUrl = blogInfo.seo_url
        this.PostCreated = dayjs(blogInfo.create_at).format('DD.MM.YYYY HH:mm')

        this.$forceUpdate();
    }

    private async OnClickSubmit(): Promise<void> {
        try {
            const response = await ApiBlog.UpdateBlogInfo(this.PostName, this.PostPublish? 1: 0, this.PostImage1, this.PostImage2, this.BlogCardDesign, this.BlogContent, this.BlogSeoDescription, this.BlogSeoKeywords, this.BlogSeoUrl, ApiEnter.CurrentSessionUUID as string, this.CurrentBlogUUID);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Успешно!",
                    text: "Blog успешно поменян",
                    icon: "success"
                }).then(() => {
                    this.$router.go(-1);
                });
            } else {
                sweetalert({
                    title: "Ошибка!",
                    text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            sweetalert({
                title: "Ошибка!",
                text: "Во время выполнения запроса, возникла ошибка!",
                icon: "error"
            });
        }
    }
}
</script>
