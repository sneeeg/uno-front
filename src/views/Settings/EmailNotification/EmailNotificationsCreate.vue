<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Email Notifications" back-url="/company/list/"/>
                <div class="col-12 px-6">
                    <v-divider></v-divider>
                </div>
                <h6 class="px-6 font-weight-bold text-uppercase">Edit</h6>
                <div class="col-12">
                    <div class="well mb-0">
                        <div class="well-wrapper">
                            <div class="row">
                                <div class="col-12">
                                    <v-switch
                                        v-model="PostPublish"
                                        label="Publish"
                                        inset
                                        hide-details
                                        class="mt-9 col-2"
                                    ></v-switch>
                                    <v-text-field
                                        label="Template ID *"
                                        v-model="PostName"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Template name *"
                                        v-model="PostName"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Topic name *"
                                        v-model="PostName"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Send TO *"
                                        v-model="PostName"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-col>
                                        <v-row class="mt-5">
                                            <v-col cols="4">
                                                <p class="mb-1 text-body-2">HTML file of E-mail template</p>
                                                <span>The file must be in HTML format</span>
                                                <v-file-input
                                                    v-model="PostImage1"
                                                    show-size
                                                    accept="image/*"
                                                    label="Upload file"
                                                    hide-details
                                                    class="mt-3"
                                                ></v-file-input>
                                                <button
                                                    @click="DownloadFile1"
                                                    class="mt-3 pa-2"
                                                    :disabled="PostImageName1 === ''"
                                                >
                                                    Download file
                                                </button>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </div>
                                <div class="col-12">
                                    <v-divider></v-divider>
                                </div>
                                <div class="col-12">
                                    <p class="font-weight-bold">The available variables</p>
                                    <ul class="pl-4 mt-2">
                                        <li><span>{{</span>name<span>}} - customer Name</span></li>
                                        <li><span>{{</span>email<span>}} - customer Email</span></li>
                                        <li><span>{{</span>order_number<span>}} - order number</span></li>
                                        <li><span>{{</span>order_status<span>}} - current order status</span></li>
                                        <li><span>{{</span>payment_status<span>}} - current order status</span></li>
                                        <li><span>{{</span>payment_amount<span>}} - total sum</span></li>
                                        <li><span>{{</span>tracking_number<span>}} - tracking number</span></li>
                                    </ul>

                                    <ul class="pl-4">
                                        <li><span>{{</span>shipping_address<span>}} - delivery address</span></li>
                                        <li><span>{{</span>billing_address<span>}} - residence address</span></li>
                                        <li><span>{{</span>payment_method<span>}} - payment method</span></li>
                                        <li><span>{{</span>order_items<span>}} - a complete list of order items and their prices</span></li>
                                        <li><span>{{</span>order_cards<span>}} - list of physical goods in the order that are sent to the address of the customer</span></li>
                                        <li><span>{{</span>tracking_link<span>}} - link to check delivery tracking</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 px-6">
                            <div class="col-12 py-6 bg-light">
                                <router-link to="/settings/email-notifications">
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
                                    :disabled="PostName === '' || BlogContent === '' ||  BlogCardDesign === '' || BlogSeoUrl === ''"
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
import ApiAdmin from "@/api/ApiAdmin";
import ApiSettings from "@/api/ApiSettings";


@Component({
    components: { PageHeader, StandartTemplate, Editor },
})

export default class EmailNotificationsCreate extends Vue {

    public Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: '/',
            text: 'Home'
        },
        {
            to: '/admin/blog',
            exact: true,
            text: 'CMS'
        },
        {
            to: '/admin/blog',
            exact: true,
            text: 'Blog'
        },
        {
            text: 'Edit',
            disabled: true
        }
    ];

    private CurrentUUID!: string;
    private PostPublish: boolean = true
    private PostName: string= ''
    private PostDate: string = ''
    private PostImage1: File | null = null
    private PostImageName1: string = ''
    private PostImage2: File | null = null
    private PostImageName2: string = ''
    private BlogCardDesign: string = ''
    private BlogContent: string = ''
    private BlogSeoDescription: string = ''
    private BlogSeoKeywords: string = ''
    private BlogSeoUrl: string = ''
    private PostCreated: string= ''

    private async DoLoadForm(): Promise<void> {

        const blogInfo: any = await ApiSettings.GetEmailNotificationByUUID(ApiEnter.CurrentSessionUUID as string, this.CurrentUUID);
        if (blogInfo == undefined) {
            sweetalert({
                title: "Oop!",
                text: "Request error, not all data was loaded!",
                icon: "error"
            }).then(() => {
                this.$router.go(-1);
            });
            return;
        }

        this.PostName = blogInfo.title
        this.PostDate = blogInfo.date
        await this.GetFiles(blogInfo.image1, blogInfo.image2)
        this.PostImageName1 = blogInfo.image1
        this.PostImageName2 = blogInfo.image2
        this.BlogCardDesign = blogInfo.card_design
        this.PostPublish = blogInfo.publish
        this.BlogContent = blogInfo.content
        this.BlogSeoDescription = blogInfo.seo_description
        this.BlogSeoKeywords = blogInfo.seo_keywords
        this.BlogSeoUrl = blogInfo.seo_url
        this.PostCreated = dayjs(blogInfo.create_at).format('DD.MM.YYYY HH:mm')

        this.$forceUpdate();
    }

    private async GetFiles(file_name1: string, file_name2: string): Promise<void> {
        if (file_name1 !== '') {
            await ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, file_name1)
                .then((response) => {
                    this.PostImage1 = new File([new Blob([response.data])], file_name1.split('/')[8])
                })
        }

        if (file_name2 !== '') {
            await ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, file_name2)
                .then((response) => {
                    this.PostImage2 = new File([new Blob([response.data])], file_name2.split('/')[8])
                })
        }
    }

    private async DownloadFile1(): Promise<void> {
        await ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, this.PostImageName1).then((response) => {
            let a = document.createElement("a")
            let file = new Blob([response])
            a.href = URL.createObjectURL(file);
            a.download = this.PostImageName1.split('/')[8];
            a.click();
        })
    }
    private async DownloadFile2(): Promise<void> {
        await ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, this.PostImageName2).then((response) => {
            let a = document.createElement("a")
            let file = new Blob([response])
            a.href = URL.createObjectURL(file);
            a.download = this.PostImageName2.split('/')[8];
            a.click();
        })
    }

    private async OnClickSubmit(): Promise<void> {
        const file_name1 = this.PostImage1?
            this.PostImage1.name === this.PostImageName1.split('/')[8] ? this.PostImageName1
                : await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID as string, this.PostImage1)
            : ''
        const file_name2 = this.PostImage2?
            this.PostImage2.name === this.PostImageName2.split('/')[8] ? this.PostImageName2
                : await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID as string, this.PostImage2)
            : ''

        try {
            const response = await ApiBlog.UpdateBlogInfo(
                this.PostName,
                dayjs(this.PostDate).format('YYYY-MM-DD'),
                this.PostPublish? 1: 0,
                file_name1,
                file_name2,
                this.BlogCardDesign,
                this.BlogContent,
                this.BlogSeoDescription,
                this.BlogSeoKeywords,
                this.BlogSeoUrl,
                ApiEnter.CurrentSessionUUID as string,
                this.CurrentUUID);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Post has updated",
                    icon: "success"
                }).then(() => {
                    this.$router.go(-1);
                });
            } else {
                sweetalert({
                    title: "Error!",
                    text: `Request error: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            sweetalert({
                title: "Error!",
                text: "Request error!",
                icon: "error"
            });
        }
    }

    private ValidateSeoUrl() {
        this.BlogSeoUrl = this.BlogSeoUrl.replace(/[. ,$@!^()'*]+/g, '-').toLowerCase()
    }

    get computedDateFormatted() {
        return dayjs(this.PostDate).format('DD.MM.YYYY')
    }

    public mounted() {
        this.CurrentUUID = this.$route.params.email_uuid;
        this.DoLoadForm();
    }
}
</script>
