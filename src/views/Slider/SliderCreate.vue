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
                                        inset
                                        class="mt-10"
                                    ></v-switch>
                                    <v-switch
                                        v-model="newPost.display_text"
                                        label="Display text on the slide"
                                        hide-details
                                        inset
                                        class="mt-10"
                                    ></v-switch>
                                    <v-text-field
                                        label="Slide title"
                                        v-model="newPost.title"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Slide subtitle"
                                        v-model="newPost.subtitle"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-row class="mt-5">
                                        <v-col cols="4">
                                            <h6 class="mb-1">Picture for Slide on desktop screens *</h6>
                                            <span>The photo must be in .jpg or .png format. Size 1400*800 pixels</span>
                                            <v-file-input
                                                v-model="newPost.image"
                                                show-size
                                                accept="image/*"
                                                label="Upload file"
                                                hide-details
                                            ></v-file-input>
                                        </v-col>
                                        <v-col cols="4" class="ml-15">
                                            <h6 class="mb-1">Picture for Slide on mobile screens *</h6>
                                            <span>The photo must be in .jpg or .png format. Size 450*680 pixels</span>
                                            <v-file-input
                                                v-model="newPost.image_m"
                                                show-size
                                                accept="image/*"
                                                label="Upload file"
                                                hide-details
                                            ></v-file-input>
                                        </v-col>
                                    </v-row>
                                    <v-text-field
                                        label="Link for the slide"
                                        v-model="newPost.link"
                                        hide-details
                                        class="col-7 px-0 mt-5"
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
                                    :disabled="newPost.title === '' || newPost.subtitle === '' || newPost.link === '' || !newPost.image || !newPost.image_m"
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
import ApiSlider from "@/api/ApiSlider";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import FormGenerator from "@/components/UI/Form/FormGenerator.vue";
import Editor from '@tinymce/tinymce-vue'
import ApiAdmin from "@/api/ApiAdmin";


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
            text: 'Slider',
            disabled: true
        }
    ];

    private newPost: any = {
        title: '',
        subtitle: '',
        publish: true,
        display_text: true,
        image: null,
        image_m: null,
        link: ''
    }

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            const slider_uuid = await ApiSlider.CreateSlider(
                ApiEnter.CurrentSessionUUID,
                this.newPost.title,
                this.newPost.subtitle,
                this.newPost.publish? 1: 0,
                this.newPost.display_text? 1: 0,
                await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID, this.newPost.image),
                await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID, this.newPost.image_m),
                this.newPost.link);
            if (slider_uuid == undefined || slider_uuid.length != 36) {
                await sweetalert({
                    title: "Request error!",
                    text: "Ошибка создания Post: " + slider_uuid,
                    icon: "info"
                });
                return;
            }

            sweetalert({
                title: "Success!",
                text: `Slider has created!`,
                icon: "success"
            }).then(() => {
                this.$forceUpdate()
                this.newPost.title = ''
                this.newPost.subtitle = ''
                this.newPost.link = ''
                this.newPost.publish = true
                this.$router.push(`/slider/slides`);
            })
        }
    }
}
</script>
