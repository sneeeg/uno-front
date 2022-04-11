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
                                        v-model="newPost.title"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Slide subtitle"
                                        v-model="newPost.subtitle"
                                        hide-details
                                        class="col-4 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Link for the slide"
                                        v-model="newPost.link"
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
import ApiSlider from "@/api/ApiSlider";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import Editor from '@tinymce/tinymce-vue'


@Component({
    components: { PageHeader, StandartTemplate, Editor },
})

export default class SliderEdit extends Vue {

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

    private CurrentSliderUUID!: string

    private newPost: any = {
        title: '',
        subtitle: '',
        publish: true,
        display_text: true,
        link: ''
    }

    public mounted() {
        this.CurrentSliderUUID = this.$route.params.slider_uuid;
        this.DoLoadForm();
    }

    private async DoLoadForm(): Promise<void> {

        const sliderInfo: any = await ApiSlider.GetSliderByUUID(ApiEnter.CurrentSessionUUID as string, this.CurrentSliderUUID);
        if (sliderInfo == undefined) {
            sweetalert({
                title: "Упс!",
                text: "Во время загрузки информации - возникла ошибка, не все данные были заружены!",
                icon: "error"
            }).then(() => {
                this.$router.go(-1);
            });
            return;
        }

        this.newPost.title = sliderInfo.title
        this.newPost.subtitle = sliderInfo.subtitle
        this.newPost.publish = sliderInfo.publish
        this.newPost.display_text = sliderInfo.display_text
        this.newPost.link = sliderInfo.link

        this.$forceUpdate();
    }

    private async OnClickSubmit(): Promise<void> {
        try {
            const response = await ApiSlider.UpdateSliderInfo(
                this.newPost.title,
                this.newPost.subtitle,
                this.newPost.publish? 1: 0,
                this.newPost.display_text? 1: 0,
                '',
                '',
                this.newPost.link,
                ApiEnter.CurrentSessionUUID,
                this.CurrentSliderUUID)
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Успешно!",
                    text: "Slider успешно поменян",
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
