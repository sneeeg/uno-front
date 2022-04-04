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
                                        v-model="PostPublish"
                                        label="Publish"
                                        hide-details
                                        class="mt-10"
                                    ></v-switch>
                                    <v-text-field
                                        label="Question"
                                        v-model="PostName"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Priority (sorting)"
                                        v-model="PostImage"
                                        hide-details
                                        class="col-4 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Category"
                                        v-model="PostImage"
                                        hide-details
                                        class="col-4 px-0 mt-5"
                                    ></v-text-field>
                                </div>
                                <div class="col-12">
                                    <h6>Answer</h6>
                                    <editor
                                        api-key="no-api-key"
                                        v-model="BlogContent"
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
                            <div class="col-12 py-6 bg-light">
                                <router-link to="/faq/questions">
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
import { Component, Ref, Vue } from "vue-property-decorator";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import sweetalert from "sweetalert";
import ApiEnter from "@/api/ApiEnter";
import ApiAdmin from "@/api/ApiAdmin";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import FormGenerator from "@/components/UI/Form/FormGenerator.vue";
import { FormGeneratorListInputModelType } from "@/struct/form/FormGenerator/FormGeneratorListInputModelType";
import DataBlogCreate from "@/data/AdminPanel/DataBlogCreate";
import Editor from '@tinymce/tinymce-vue'


@Component({
    components: { PageHeader, StandartTemplate, FormGenerator, Editor },
})

export default class CreateQuestion extends Vue {

    @Ref("company-form-generator") private CompanyFormGenerator!: FormGenerator;
    private BlogInfoModel: FormGeneratorListInputModelType = DataBlogCreate.BlogInfoModel;

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

    private BlogContent: string = ''

    private PostName: string= ''
    private PostImage: string= ''
    private PostPublish: boolean = false

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const blog_uuid = await ApiAdmin.CreateFaqQuestion(
                ApiEnter.CurrentSessionUUID,
                this.PostName,
                this.PostPublish,
                this.PostImage,
                this.BlogContent);
            if (blog_uuid == undefined || blog_uuid.length != 36) {
                sweetalert({
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
                this.BlogInfoModel.Title.value = ''
                this.BlogInfoModel.IsShow.value = ''
                this.BlogInfoModel.Image.value = ''
                this.BlogContent = ''
                this.$router.push(`/admin/blog`);
            })
        }
    }
}
</script>
