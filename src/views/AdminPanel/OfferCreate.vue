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
                                label="Offer name"
                                v-model="newOffer.name"
                                hide-details="auto"
                                @input="GenerateSeoUrl"
                            ></v-text-field>
                        </div>
                        <div class="col-3">
                            <v-text-field
                                label="Priority (sorting)"
                                type="number"
                                v-model="newOffer.priority"
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
                                    label="Price, €"
                                    v-model="newOffer.price"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="Data, GB"
                                    v-model="newOffer.data"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="SMS"
                                    v-model="newOffer.sms"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="Minutes"
                                    v-model="newOffer.min"
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
                                value="Special rates abroad"
                                class="m-0"
                                hide-details
                            ></v-checkbox>
                        </div>
                        <div class="col-12">
                            <v-checkbox
                                v-model="newOffer.free"
                                label="FREE activation"
                                color="indigo darken-3"
                                value="FREE activation"
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
                                api-key="no-api-key"
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
                                api-key="no-api-key"
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
                                label="Card design"
                                outlined
                            ></v-select>
                        </div>
                        <div class="row col-12">
                            <div class="col-4">
                                <h6>Photo for list of offers</h6>
                                <span>The photo must be in .jpg or .png format. Size 700*350 pixels</span>
                                <v-file-input
                                    show-size
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
                                    :value="'non'"
                                ></v-radio>
                            </v-radio-group>
                        </div>
                        <div class="col-12">
                            <p>Overview for Tariff transparency</p>
                        </div>
                        <div class="col-12 row">
                            <div class="col-4">
                                <h6>Informative prospect</h6>
                                <span>The file must be in PDF format</span>
                                <v-text-field
                                    label="Photo URL"
                                    v-model="newOffer.prospects_info"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-4 ml-10">
                                <h6>Contract summary</h6>
                                <span>
                                    The file must be in PDF format
                                </span>
                                <v-text-field
                                    label="Photo URL"
                                    v-model="newOffer.contract"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <v-divider class="col-12 p-0 mt-10"></v-divider>
                        <h6 class="col-12">For E-SHOP</h6>
                        <div class="col-12 row">
                            <div class="col-2">
                                <v-text-field
                                    label="Price, €"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-3">
                                <v-text-field
                                    label="Activation price (for NEW user)"
                                    v-model="newOffer.activation_price"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <v-checkbox
                            v-model="newOffer.is_porting"
                            label="Offer can be PORTING"
                            class="col-12"
                            color="indigo darken-3"
                            value="Per tutti"
                            hide-details
                        ></v-checkbox>
                        <div class="col-12 row">
                            <div class="col-3">
                                <v-text-field
                                    label="Activation price for Vodafone group"
                                    v-model="newOffer.price_vodafone"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-3">
                                <v-text-field
                                    label="Activation price for other operators"
                                    v-model="newOffer.price_others"
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
import ApiBlog from "@/api/ApiBlog";
import sweetalert from "sweetalert";

@Component({
    components: { StandartTemplate, PageHeader, Editor }
})
export default class OfferCreate extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataOffers.OfferCreateBreadcrumbs;
    private NewCategoryCardDesign: string[] = ['Blue', 'Orange', 'Transparent']

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
        photo_list: '',
        photo_slide: '',
        photo_slide_m: '',
        display_offers: true,
        display_home: true,
        display_slider: true,
        active: 'active',
        prospects_info: '',
        contract: '',
        activation_price: '',
        is_porting: true,
        price_vodafone: '',
        price_others: '',
        title: '',
        description: '',
        keywords: '',
        url: ''
    }

    private GenerateSeoUrl() {
        this.newOffer.url = this.newOffer.name.replace(/[. ,:-=&+#$?|%@!^(){}'*]+/g, "-").toLowerCase()
    }

    private ValidateSeoUrl() {
        this.newOffer.url = this.newOffer.url.replace(/[. ,$@!^()'*]+/g, '-').toLowerCase()
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
            this.$forceUpdate();

            const offer_uuid = await ApiOffer.CreateOffer(
                ApiEnter.CurrentSessionUUID,
                this.newOffer.name,
                this.newOffer.priority,
                this.newOffer.publish? 1: 0,
                this.newOffer.category,
                this.newOffer.price,
                this.newOffer.data,
                this.newOffer.sms,
                this.newOffer.min,
                this.newOffer.additional_data,
                this.newOffer.int_min,
                this.newOffer.countries,
                this.newOffer.rates_abroad? 1 : 0,
                this.newOffer.free? 1: 0,
                this.newOffer.activation_info,
                this.newOffer.display_roaming? 1: 0,
                this.newOffer.overview,
                this.newOffer.note,
                this.newOffer.design,
                this.newOffer.photo_list,
                this.newOffer.photo_slide,
                this.newOffer.photo_slide_m,
                this.newOffer.display_offers? 1 : 0,
                this.newOffer.display_home? 1 : 0,
                this.newOffer.display_slider? 1 : 0,
                this.newOffer.active === 'active'? 1: 0,
                this.newOffer.prospects_info,
                this.newOffer.contract,
                this.newOffer.activation_price,
                this.newOffer.is_porting? 1: 0,
                this.newOffer.price_vodafone,
                this.newOffer.price_others,
                this.newOffer.title,
                this.newOffer.description,
                this.newOffer.keywords,
                this.newOffer.url);
            if (offer_uuid == undefined || offer_uuid.length != 36) {
                await sweetalert({
                    title: "Request error!",
                    text: "Creating error Offer: " + offer_uuid,
                    icon: "info"
                });
                return;
            }

            sweetalert({
                title: "Success!",
                text: `Offer has created!`,
                icon: "success"
            }).then(() => {
                this.$forceUpdate()
                this.$router.push(`/shop/offers`);
            })
        }
    }

    async mounted() {
        await this.getOffersCategories()
    }
}
</script>
