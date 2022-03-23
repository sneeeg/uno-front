<template>
    <div class="page-container">
        <standart-template>
            <div class="container">
                <v-form ref="ValidateForms">
                    <div class="row mt-1">
                        <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                        <page-header title="Create Blog" back-url="/company/list/"/>
                        <div class="col-12">
                            <div class="well">
                                <div class="well-wrapper">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="row">
                                                <form-generator ref="company-form-generator" title="Данные о компании"
                                                                :form-model="BlogInfoModel"/>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <editor
                                                    api-key="no-api-key"
                                                    v-model="BlogContent"
                                                    :init="{
                                                         height: 200,
                                                         menubar: false,
                                                         plugins: []
                                                       }"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-12 text-center mt-4 pt-3 mb-5 border-top">
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <v-btn color="success" @click="OnClickSubmit()" :loading="HasRequest">
                                                    Create Blog
                                                </v-btn>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-form>
            </div>
        </standart-template>
    </div>
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

export default class BlogCreate extends Vue {

    @Ref("company-form-generator") private CompanyFormGenerator!: FormGenerator;
    private BlogInfoModel: FormGeneratorListInputModelType = DataBlogCreate.BlogInfoModel;

    public Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: '/',
            text: 'Main'
        },
        {
            to: '/admin/blog',
            text: 'Blog'
        },
        {
            text: 'Blog Create',
            disabled: true
        }
    ];

    private BlogContent: string = ''

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const blog_uuid = await ApiAdmin.CreateBlog(
                ApiEnter.CurrentSessionUUID,
                this.BlogInfoModel.Title.value,
                this.BlogInfoModel.IsShow.value,
                this.BlogInfoModel.Image.value,
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
