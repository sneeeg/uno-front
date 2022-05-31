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
                                    <v-col>
                                        <h5 class="font-weight-medium">Main information</h5>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-menu
                                            v-model="isOpenDate"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="computedDateFormatted"
                                                    label="Date"
                                                    prepend-icon="mdi-calendar"
                                                    hide-details
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="PostDate"
                                                locale="en"
                                                @input="isOpenDate = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-switch
                                            v-model="PostPublish"
                                            label="Publish"
                                            inset
                                            hide-details
                                        ></v-switch>
                                    </v-col>
                                    <v-col cols="7" class="mt-5">
                                        <v-text-field
                                            label="Post name"
                                            v-model="PostName"
                                            hide-details
                                            @input="GenerateSeoUrl"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-select
                                            :items="CardDesignData"
                                            v-model="PostCardDesign"
                                            label="Card design"
                                            hide-details
                                            outlined
                                        ></v-select>
                                    </v-col>
                                    <v-col>
                                        <v-row class="mt-5">
                                            <v-col cols="4">
                                                <h6 class="mb-1">Post image size1</h6>
                                                <span>The photo must be in .jpg or .png format. Size 1365*505 pixels</span>
                                                <v-file-input
                                                    v-model="PostImage1"
                                                    show-size
                                                    accept="image/*"
                                                    label="Upload file"
                                                    hide-details
                                                ></v-file-input>
                                            </v-col>
                                            <v-col cols="4" class="ml-15">
                                                <h6 class="mb-1">Post image size2</h6>
                                                <span>The photo must be in .jpg or .png format. Size 680*450 pixels</span>
                                                <v-file-input
                                                    v-model="PostImage2"
                                                    show-size
                                                    accept="image/*"
                                                    label="Upload file"
                                                    hide-details
                                                ></v-file-input>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </div>
                                <div class="col-12">
                                    <ckeditor :editor="editor" v-model="PostContent" />
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
                                        v-model="PostSeoDescription"
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
                                        v-model="PostSeoKeywords"
                                        value=""
                                    ></v-textarea>
                                    <v-text-field
                                        label="URL"
                                        v-model="PostSeoUrl"
                                        hide-details
                                        class="col-5 px-0 mt-5"
                                        @input="ValidateSeoUrl"
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
                                    :disabled="PostName === '' || PostContent === '' ||  PostCardDesign === ''"
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
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ApiAdmin from "@/api/ApiAdmin";
import dayjs from "dayjs";


@Component({
    components: { PageHeader, StandartTemplate, CKEditor },
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
    public editor = ClassicEditor

    private CardDesignData: string[] = ['Blue', 'Orange', 'White', 'With image']

    private isOpenDate: boolean = false

    private PostPublish: boolean = true
    private PostName: string= ''
    private PostDate: string = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    private PostImage1: File | null = null
    private PostImage2: File | null = null
    private PostCardDesign: string = ''
    private PostContent: string = ''
    private PostSeoDescription: string = ''
    private PostSeoKeywords: string = ''
    private PostSeoUrl: string = ''

    get computedDateFormatted() {
        return dayjs(this.PostDate).format('DD.MM.YYYY')
    }

    private GenerateSeoUrl() {
        this.PostSeoUrl = this.PostName.replace(/[. ,:-=&+#$?|%@!^(){}'*]+/g, "-").toLowerCase()
    }

    private ValidateSeoUrl() {
        this.PostSeoUrl = this.PostSeoUrl.replace(/[. ,$@!^()'*]+/g, '-').toLowerCase()
    }

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            const file_name1 = this.PostImage1 !== null? await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID, this.PostImage1) : ''
            const file_name2 = this.PostImage2 !== null? await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID, this.PostImage2) : ''
            const post_uuid = await ApiBlog.CreateBlog(
                ApiEnter.CurrentSessionUUID,
                this.PostName,
                dayjs(this.PostDate).format('YYYY-MM-DD'),
                this.PostPublish? 1: 0,
                file_name1,
                file_name2,
                this.PostCardDesign,
                this.PostContent,
                this.PostSeoDescription,
                this.PostSeoKeywords,
                this.PostSeoUrl);
            if (post_uuid == undefined || post_uuid.length != 36) {
                await sweetalert({
                    title: "Request error!",
                    text: "Error creating Post: " + post_uuid,
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
                this.$router.push(`/admin/blog`);
            })
        }
    }
}
</script>
