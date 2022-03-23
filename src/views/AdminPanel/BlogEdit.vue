<template>
    <div class="page-container">
        <standart-template>
            <div class="container">
                <v-form ref="ValidateForms">
                    <div class="row mt-1">
                        <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                        <page-header title="Edit Blog" back-url="/company/list/"/>
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
                                                    Edit Blog
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

export default class BlogEdit extends Vue {

    @Ref("company-form-generator") private CompanyFormGenerator!: FormGenerator;
    private BlogInfoModel: FormGeneratorListInputModelType = DataBlogCreate.BlogInfoModel;

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
    private CurrentBlogUUID!: string;

    private BlogContent: string = ''

    private created() {
        this.CurrentBlogUUID = this.$route.params.blog_uuid;
        this.DoLoadForm();
    }

    private SetInputValue(model: any, line: string): void {
        model.value = line;
    }

    private async DoLoadForm(): Promise<void> {

        const blogInfo: any = await ApiAdmin.GetBlogByUUID(ApiEnter.CurrentSessionUUID as string, this.CurrentBlogUUID);
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

        this.SetInputValue(this.BlogInfoModel.Title, blogInfo.title);
        this.SetInputValue(this.BlogInfoModel.IsShow, blogInfo.is_show);
        this.SetInputValue(this.BlogInfoModel.Image, blogInfo.image);
        this.BlogContent = blogInfo.content

        this.$forceUpdate();
    }

    private async OnClickSubmit(): Promise<void> {
        try {
            const response = await ApiAdmin.UpdateBlogInfo(this.BlogInfoModel.Title.value, this.BlogInfoModel.IsShow.value, this.BlogInfoModel.Image.value, this.BlogContent, ApiEnter.CurrentSessionUUID as string, this.CurrentBlogUUID);
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
