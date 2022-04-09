<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Slider" back-url="/company/list/"/>
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
                                    <v-switch
                                        v-model="newPost.display_text"
                                        label="Display text on the slide"
                                        hide-details
                                        class="mt-10"
                                    ></v-switch>
                                    <v-text-field
                                        label="Slide title"
                                        v-model="newPost.question"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Slide subtitle"
                                        v-model="newPost.priority"
                                        hide-details
                                        class="col-4 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Link for the slide"
                                        v-model="newPost.priority"
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
                                <router-link to="/slider/slides">
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
import { Component, Ref, Vue } from "vue-property-decorator";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import sweetalert from "sweetalert";
import ApiEnter from "@/api/ApiEnter";
import ApiFaq from "@/api/ApiFaq";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import FormGenerator from "@/components/UI/Form/FormGenerator.vue";
import Editor from '@tinymce/tinymce-vue'


@Component({
    components: { PageHeader, StandartTemplate, FormGenerator, Editor },
})

export default class SliderCreate extends Vue {

    @Ref("company-form-generator") private CompanyFormGenerator!: FormGenerator;

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

    private FaqCategories: any = []

    private newPost: any = {
        answer: '',
        question: '',
        publish: true,
        display_text: true,
        priority: '',
        category: undefined
    }

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const blog_uuid = await ApiFaq.CreateFaqQuestion(
                ApiEnter.CurrentSessionUUID,
                this.newPost.answer,
                this.newPost.question,
                this.newPost.priority,
                this.newPost.publish? 1: 0,
                this.newPost.category);
            if (blog_uuid == undefined || blog_uuid.length != 36) {
                sweetalert({
                    title: "Request error!",
                    text: "Ошибка создания Post: " + blog_uuid,
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
                this.newPost.answer = ''
                this.newPost.question = ''
                this.newPost.priority = ''
                this.newPost.publish = true
                this.newPost.category = ''
                this.$router.push(`/admin/faq`);
            })
        }
    }

    private async GetFaqCategories(): Promise<void> {
        try {
            this.FaqCategories = await ApiFaq.GetFaqCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    public created(): void {
        this.GetFaqCategories()
    }
}
</script>
