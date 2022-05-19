<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Offers" back-url="/"/>

                <div class="col-12 mt-5">
                    <router-link to="/shop/offers">
                        <v-btn depressed small color="light-blue darken-4" class="white--text">
                            Offers
                        </v-btn>
                    </router-link>
                    <router-link to="/shop/offers/categories" class="ml-3">
                        <v-btn depressed small color="white">
                            Categories
                        </v-btn>
                    </router-link>
                </div>
                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <h6 class="px-6 font-weight-bold text-uppercase">Edit</h6>

                <v-row class="mt-10">
                    <div class="col-12 bg-white pb-15">
                        <v-col>
                            <h5 class="font-weight-medium">Main information</h5>
                        </v-col>
                        <div class="col-12">
                            <v-switch
                                v-model="newOffer.publish"
                                label="Publish"
                                hide-details
                                inset
                            ></v-switch>
                        </div>
                        <div class="col-6">
                            <v-text-field
                                label="Offer name *"
                                v-model="newOffer.name"
                                hide-details="auto"
                                :rules="[() => !!newOffer.name || 'This field is required']"
                                required
                                @input="GenerateSeoUrl"
                            ></v-text-field>
                        </div>
                        <div class="col-3">
                            <v-text-field
                                label="Priority (sorting) *"
                                type="number"
                                v-model="newOffer.priority"
                                :rules="[() => !!newOffer.priority || 'This field is required']"
                                required
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="col-12">
                            <p>Category</p>
                            <div class="row d-flex">
                                <v-checkbox
                                    v-model="OfferCategory"
                                    v-for="item in OffersCategories"
                                    :key="item.uuid"
                                    :label="item.name"
                                    color="indigo darken-3"
                                    :value="item.name"
                                    class="col-2 mt-1"
                                    hide-details
                                ></v-checkbox>
                            </div>
                        </div>
                        <v-divider class="col-12 p-0"></v-divider>
                        <div class="col-6">
                            <p>Offer parameters</p>
                            <span>
                                A parameter with an empty value will
                                not be displayed on the site. The value 0 is not empty.* -
                                required parameters
                            </span>
                        </div>
                        <div class="col-12 row">
                            <div class="col-2">
                                <v-text-field
                                    label="Price, € *"
                                    v-model="newOffer.price"
                                    :rules="[() => !!newOffer.price || 'This field is required']"
                                    required
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="Data, GB"
                                    v-model="newOffer.data"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="SMS"
                                    v-model="newOffer.sms"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="Minutes"
                                    v-model="newOffer.min"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <div class="col-12 row">
                            <div class="col-6">
                                <v-text-field
                                    label="Additional Data"
                                    v-model="newOffer.additional_data"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="Int. minutes"
                                    type="number"
                                    v-model="newOffer.int_min"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <div class="col-6">
                            <v-textarea
                                outlined
                                name="input-7-4"
                                no-resize
                                hide-details
                                label="Countries for International minutes"
                                value=""
                                v-model="newOffer.countries"
                            ></v-textarea>
                        </div>
                        <div class="col-12">
                            <v-checkbox
                                v-model="newOffer.rates_abroad"
                                label="Special rates abroad"
                                color="indigo darken-3"
                                class="m-0"
                                hide-details
                            ></v-checkbox>
                        </div>
                        <div class="col-12">
                            <v-checkbox
                                v-model="newOffer.free"
                                label="FREE activation"
                                color="indigo darken-3"
                                class="m-0"
                                hide-details
                            ></v-checkbox>
                        </div>
                        <div class="col-6">
                            <v-textarea
                                outlined
                                name="input-7-4"
                                v-model="newOffer.activation_info"
                                no-resize
                                hide-details
                                label="Activation info"
                                value=""
                            ></v-textarea>
                        </div>
                        <div class="col-12">
                            <p>Offer overview</p>
                            <editor
                                api-key="nqotow8s9iolgxioaipdmhd8w1vxs3wljhwp09z8l82bi2xb"
                                v-model="newOffer.overview"
                                class="mt-4"
                                :init="{
                                             height: 500,
                                             menubar: false,
                                             toolbar: 'undo redo | bold italic underline strikethrough | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | indent outdent | bullist numlist | forecolor backcolor casechange formatpainter removeformat | pagebreak | emoticons charmap | link image media pageembed anchor | table',
                                             plugins: 'anchor lists advlist image media link pagebreak emoticons charmap casechange formatpainter code pageembed table',
                                             formats: {
                                                borderstyle: { selector: 'td,th', styles: { borderTopStyle: 'solid', borderRightStyle: 'solid', borderBottomStyle: 'solid', borderLeftStyle: 'solid', }, remove_similar: true },
                                                bordercolor: { selector: 'td,th', styles: { borderTopColor: '#32CD32', borderRightColor: '#32CD32', borderBottomColor: '#32CD32', borderLeftColor: '#32CD32' }, remove_similar: true },
                                                backgroundcolor: { selector: 'td,th', styles: { backgroundColor: '#006400' }, remove_similar: true },
                                                formatpainter_removeformat: [
                                                  { selector: 'b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins',
                                                    remove: 'all',
                                                    split: true,
                                                    expand: false,
                                                    block_expand: true,
                                                    deep: true
                                                  },
                                                  { selector: 'span',
                                                    attributes: ['style', 'class'],
                                                    remove: 'empty',
                                                    split: true,
                                                    expand: false,
                                                    deep: true
                                                  },
                                                  { selector: '*:not(tr,td,th,table)',
                                                    attributes: ['style', 'class'],
                                                    split: false,
                                                    expand: false,
                                                    deep: true
                                                  }
                                                ]
                                              },
                                       }"/>
                        </div>
                        <div class="col-12">
                            <p>Note</p>
                            <editor
                                api-key="nqotow8s9iolgxioaipdmhd8w1vxs3wljhwp09z8l82bi2xb"
                                class="mt-4"
                                v-model="newOffer.note"
                                :init="{
                                             height: 500,
                                             menubar: false,
                                             toolbar: 'undo redo | bold italic underline strikethrough | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | indent outdent | bullist numlist | forecolor backcolor casechange formatpainter removeformat | pagebreak | emoticons charmap | link image media pageembed anchor | table',
                                             plugins: 'anchor lists advlist image media link pagebreak emoticons charmap casechange formatpainter code pageembed table',
                                             formats: {
                                                borderstyle: { selector: 'td,th', styles: { borderTopStyle: 'solid', borderRightStyle: 'solid', borderBottomStyle: 'solid', borderLeftStyle: 'solid', }, remove_similar: true },
                                                bordercolor: { selector: 'td,th', styles: { borderTopColor: '#32CD32', borderRightColor: '#32CD32', borderBottomColor: '#32CD32', borderLeftColor: '#32CD32' }, remove_similar: true },
                                                backgroundcolor: { selector: 'td,th', styles: { backgroundColor: '#006400' }, remove_similar: true },
                                                formatpainter_removeformat: [
                                                  { selector: 'b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins',
                                                    remove: 'all',
                                                    split: true,
                                                    expand: false,
                                                    block_expand: true,
                                                    deep: true
                                                  },
                                                  { selector: 'span',
                                                    attributes: ['style', 'class'],
                                                    remove: 'empty',
                                                    split: true,
                                                    expand: false,
                                                    deep: true
                                                  },
                                                  { selector: '*:not(tr,td,th,table)',
                                                    attributes: ['style', 'class'],
                                                    split: false,
                                                    expand: false,
                                                    deep: true
                                                  }
                                                ]
                                              },
                                       }"/>
                        </div>
                        <v-divider class="col-12 p-0"></v-divider>
                        <h6 class="col-12">Display options</h6>
                        <div class="col-5">
                            <v-select
                                :items="NewCategoryCardDesign"
                                v-model="newOffer.design"
                                label="Card design *"
                                :rules="[() => !!newOffer.design || 'This field is required']"
                                required
                                outlined
                            ></v-select>
                        </div>
                        <div class="row col-12">
                            <div class="col-4">
                                <h6>Photo for list of offers</h6>
                                <span>The photo must be in .jpg or .png format. Size 700*350 pixels</span>
                                <v-file-input
                                    show-size
                                    v-model="newOffer.photo_list"
                                    label="Upload file"
                                    hide-details
                                ></v-file-input>
                            </div>
                            <div class="col-4">
                                <h6>Photo for Slide on desktop screens</h6>
                                <span>
                                    The photo must be in .jpg or .png format.
                                    For Blue or Orange design -  size 800*800 pixels
                                    For Transparent design - size 1400*800 pixels
                                </span>
                                <v-file-input
                                    show-size
                                    v-model="newOffer.photo_slide"
                                    label="Upload file"
                                    hide-details
                                ></v-file-input>
                            </div>
                            <div class="col-4">
                                <h6>Photo for Slide on mobile screens</h6>
                                <span>
                                    The photo must be in .jpg or .png format.
                                    For Blue or Orange design -  size 450*300 pixels
                                    For Transparent design - size 450*680 pixels
                                </span>
                                <v-file-input
                                    show-size
                                    v-model="newOffer.photo_slide_m"
                                    label="Upload file"
                                    hide-details
                                ></v-file-input>
                            </div>
                        </div>
                        <h6 class="col-12">Where display</h6>
                        <div class="col-12 row">
                            <v-checkbox
                                v-model="newOffer.display_offers"
                                label="in OFFERS PAGE"
                                color="indigo darken-3"
                                class="col-3"
                                hide-details
                            ></v-checkbox>
                            <v-checkbox
                                v-model="newOffer.display_home"
                                label="in HOME PAGE"
                                color="indigo darken-3"
                                class="col-3"
                                hide-details
                            ></v-checkbox>
                            <v-checkbox
                                v-model="newOffer.display_slider"
                                label="in SLIDER"
                                color="indigo darken-3"
                                class="col-3"
                                hide-details
                            ></v-checkbox>
                        </div>
                        <v-divider class="col-12 p-0"></v-divider>
                        <h6 class="col-12">Tariff transparency</h6>
                        <div class="col-12 row">
                            <v-radio-group row v-model="newOffer.active">
                                <v-radio
                                    :label="'Offerte attivabili'"
                                    :value="'active'"
                                ></v-radio>
                                <v-radio
                                    :label="'Offerte non più attivabili'"
                                    :value="'non_active'"
                                ></v-radio>
                            </v-radio-group>
                        </div>
                        <div class="col-12">
                            <p>Overview for Tariff transparency</p>
                            <editor
                                api-key="nqotow8s9iolgxioaipdmhd8w1vxs3wljhwp09z8l82bi2xb"
                                class="mt-4"
                                v-model="newOffer.tariff_overview"
                                :init="{
                                             height: 500,
                                             menubar: false,
                                             toolbar: 'undo redo | bold italic underline strikethrough | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | indent outdent | bullist numlist | forecolor backcolor casechange formatpainter removeformat | pagebreak | emoticons charmap | link image media pageembed anchor | table',
                                             plugins: 'anchor lists advlist image media link pagebreak emoticons charmap casechange formatpainter code pageembed table',
                                             formats: {
                                                borderstyle: { selector: 'td,th', styles: { borderTopStyle: 'solid', borderRightStyle: 'solid', borderBottomStyle: 'solid', borderLeftStyle: 'solid', }, remove_similar: true },
                                                bordercolor: { selector: 'td,th', styles: { borderTopColor: '#32CD32', borderRightColor: '#32CD32', borderBottomColor: '#32CD32', borderLeftColor: '#32CD32' }, remove_similar: true },
                                                backgroundcolor: { selector: 'td,th', styles: { backgroundColor: '#006400' }, remove_similar: true },
                                                formatpainter_removeformat: [
                                                  { selector: 'b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins',
                                                    remove: 'all',
                                                    split: true,
                                                    expand: false,
                                                    block_expand: true,
                                                    deep: true
                                                  },
                                                  { selector: 'span',
                                                    attributes: ['style', 'class'],
                                                    remove: 'empty',
                                                    split: true,
                                                    expand: false,
                                                    deep: true
                                                  },
                                                  { selector: '*:not(tr,td,th,table)',
                                                    attributes: ['style', 'class'],
                                                    split: false,
                                                    expand: false,
                                                    deep: true
                                                  }
                                                ]
                                              },
                                       }"/>

                        </div>
                        <div class="col-12 row">
                            <div class="col-4">
                                <h6>Informative prospect</h6>
                                <span>The file must be in PDF format</span>
                                <v-file-input
                                    show-size
                                    label="Upload file"
                                    v-model="newOffer.prospects_info"
                                    hide-details
                                ></v-file-input>
                            </div>
                            <div class="col-4 ml-10">
                                <h6>Contract summary</h6>
                                <span>
                                    The file must be in PDF format
                                </span>
                                <v-file-input
                                    show-size
                                    label="Upload file"
                                    v-model="newOffer.contract"
                                    hide-details
                                ></v-file-input>
                            </div>
                        </div>
                        <v-divider class="col-12 p-0 mt-10"></v-divider>
                        <h6 class="col-12">For E-SHOP</h6>
                        <div class="col-12 row">
                            <div class="col-2">
                                <v-text-field
                                    label="Price, € *"
                                    hide-details="auto"
                                    v-model="newOffer.shop_price"
                                    :rules="[() => !!newOffer.shop_price || 'This field is required']"
                                    type="number"
                                    required
                                ></v-text-field>
                            </div>
                            <div class="col-3">
                                <v-text-field
                                    label="Activation price (for NEW user)"
                                    v-model="newOffer.activation_price"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <v-checkbox
                            v-model="newOffer.is_porting"
                            label="Offer can be PORTING"
                            class="col-12"
                            color="indigo darken-3"
                            hide-details
                        ></v-checkbox>
                        <div class="col-12 row">
                            <div class="col-3">
                                <v-text-field
                                    label="Activation price for Vodafone *"
                                    v-model="newOffer.price_vodafone"
                                    :rules="[() => !!newOffer.price_vodafone || 'This field is required']"
                                    required
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-3">
                                <v-text-field
                                    label="Activation price for other operators"
                                    v-model="newOffer.price_others"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <v-divider class="col-12 p-0 mt-10"></v-divider>
                        <h6 class="col-12">SEO section</h6>
                        <v-text-field
                            label="Title"
                            v-model="newOffer.title"
                            class="col-5"
                            hide-details="auto"
                        ></v-text-field>
                        <v-textarea
                            outlined
                            name="input-7-4"
                            v-model="newOffer.description"
                            no-resize
                            hide-details
                            label="Description"
                            class="col-5 mt-10 ml-2"
                        ></v-textarea>
                        <v-textarea
                            outlined
                            name="input-7-4"
                            v-model="newOffer.keywords"
                            no-resize
                            hide-details
                            label="Keywords"
                            class="col-5 mt-10 ml-2"
                        ></v-textarea>
                        <v-text-field
                            label="URL"
                            class="col-5"
                            v-model="newOffer.url"
                            hide-details="auto"
                            @input="ValidateSeoUrl"
                        ></v-text-field>
                    </div>
                </v-row>
                <div class="col-12">
                    <div class="col-12 row bg-light">
                        <v-btn
                            color="grey lighten-1"
                            class="white--text col-1 ml-2"
                            small
                            depressed>
                            Cancel
                        </v-btn>
                        <v-btn
                            color="orange accent-4"
                            class="white--text col-1 ml-4"
                            small
                            depressed
                            :disabled="!newOffer.name || !newOffer.priority || !newOffer.price || !newOffer.design || !newOffer.shop_price || !newOffer.price_vodafone"
                            @click="OnClickSubmit">
                            Save
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </standart-template>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageHeader from "@/components/UI/PageHeader.vue";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import DataOffers from "@/data/AdminPanel/DataOffers";
import ApiEnter from "@/api/ApiEnter";
import IAdminPanelOffersCategoriesList from "@/struct/admin-panel/IAdminPanelOffersCategoriesList";
import Editor from '@tinymce/tinymce-vue'
import ApiOffer from "@/api/ApiOffer";
import sweetalert from "sweetalert";
import dayjs from "dayjs";
import ApiAdmin from "@/api/ApiAdmin";

@Component({
    components: { StandartTemplate, PageHeader, Editor }
})
export default class OfferEdit extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataOffers.OfferEditBreadcrumbs;
    private NewCategoryCardDesign: string[] = ['Blue', 'Orange', 'Transparent']

    private CurrentOfferUUID!: string
    private OfferCategory: any = []
    private OffersCategories: IAdminPanelOffersCategoriesList[] | undefined = []

    private newOffer: any = {
        name: '',
        priority: '',
        publish: true,
        category: '123123132321',
        price: '',
        data: '',
        sms: '',
        min: '',
        additional_data: '',
        int_min: '',
        countries: '',
        rates_abroad: true,
        free: true,
        activation_info: '',
        display_roaming: true,
        overview: '',
        note: '',
        design: '',
        photo_list: null,
        photo_slide: null,
        photo_slide_m: null,
        display_offers: true,
        display_home: false,
        display_slider: false,
        active: 'active',
        tariff_overview: '',
        prospects_info: null,
        contract: null,
        shop_price: '',
        activation_price: '',
        is_porting: true,
        price_vodafone: '',
        price_others: '',
        title: '',
        description: '',
        keywords: '',
        url: ''
    }

    private async GetOfferInfo(): Promise<void> {

        const offerInfo: any = await ApiOffer.GetOfferByUUID(ApiEnter.CurrentSessionUUID as string, this.CurrentOfferUUID);
        if (offerInfo == undefined) {
            sweetalert({
                title: "Oop!",
                text: "Request error, not all data was loaded!",
                icon: "error"
            }).then(() => {
                this.$router.go(-1);
            });
            return;
        }

        this.newOffer.name = offerInfo.name
        this.newOffer.priority = offerInfo.priority
        this.newOffer.publish = offerInfo.publish

        this.newOffer.price = offerInfo.price
        this.newOffer.data = offerInfo.data
        this.newOffer.sms = offerInfo.sms
        this.newOffer.min = offerInfo.min
        this.newOffer.additional_data = offerInfo.additional_data
        this.newOffer.int_min = offerInfo.int_min
        this.newOffer.countries = offerInfo.countries
        this.newOffer.rates_abroad = offerInfo.rates_abroad
        this.newOffer.free = offerInfo.free
        this.newOffer.activation_info = offerInfo.activation_info

        this.newOffer.display_roaming = offerInfo.display_roaming
        this.newOffer.overview = offerInfo.overview
        this.newOffer.note = offerInfo.note

        this.newOffer.design = offerInfo.design
        this.newOffer.photo_list = offerInfo.photo_list ? ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, offerInfo.photo_list)
                .then((response) => {
                    this.newOffer.photo_list = new File([new Blob([response.data])], offerInfo.photo_list.split('/')[8])
                }) : null
        this.newOffer.photo_slide = offerInfo.photo_slide ? ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, offerInfo.photo_slide)
            .then((response) => {
                this.newOffer.photo_slide = new File([new Blob([response.data])], offerInfo.photo_slide.split('/')[8])
            }) : null
        this.newOffer.photo_slide_m = offerInfo.photo_slide_m ? ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, offerInfo.photo_slide_m)
            .then((response) => {
                this.newOffer.photo_slide_m = new File([new Blob([response.data])], offerInfo.photo_slide_m.split('/')[8])
            }) : null
        this.newOffer.display_offers = offerInfo.display_offers
        this.newOffer.display_home = offerInfo.display_home
        this.newOffer.display_slider = offerInfo.display_slider

        this.newOffer.active = offerInfo.active === 1? 'active' : 'non_active'
        this.newOffer.tariff_overview = offerInfo.tariff_overview
        this.newOffer.prospects_info = offerInfo.prospects_info ? ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, offerInfo.prospects_info)
            .then((response) => {
                this.newOffer.prospects_info = new File([new Blob([response.data])], offerInfo.prospects_info.split('/')[8])
            }) : null
        this.newOffer.contract = offerInfo.contract ? ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, offerInfo.contract)
            .then((response) => {
                this.newOffer.contract = new File([new Blob([response.data])], offerInfo.contract.split('/')[8])
            }) : null

        this.newOffer.shop_price = offerInfo.shop_price
        this.newOffer.activation_price = offerInfo.activation_price
        this.newOffer.is_porting = offerInfo.is_porting
        this.newOffer.price_vodafone = offerInfo.price_vodafone
        this.newOffer.price_others = offerInfo.price_others

        this.newOffer.title = offerInfo.title
        this.newOffer.description = offerInfo.description
        this.newOffer.keywords = offerInfo.keywords
        this.newOffer.url = offerInfo.url
    }

    private async getOffersCategories(): Promise<void> {
        try {
            this.OffersCategories = await ApiOffer.GetOfferCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {

            sweetalert({
                title: "Success!",
                text: `Offer has updated!`,
                icon: "success"
            }).then(() => {
                this.$forceUpdate()
                this.$router.push(`/shop/offers`);
            })
        }
    }

    private GenerateSeoUrl() {
        this.newOffer.url = this.newOffer.name.replace(/[. ,:-=&+#$?|%@!^(){}'*]+/g, "-").toLowerCase()
    }

    private ValidateSeoUrl() {
        this.newOffer.url = this.newOffer.url.replace(/[. ,$@!^()'*]+/g, '-').toLowerCase()
    }

    async mounted() {
        this.CurrentOfferUUID = this.$route.params.offer_uuid;
        await this.getOffersCategories()
        await this.GetOfferInfo()
    }
}
</script>
