<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Offers" back-url="/"/>

                <div class="col-12 mt-5">
                    <router-link to="/admin/catalog/offers">
                        <v-btn depressed small color="light-blue darken-4" class="white--text">
                            Offers
                        </v-btn>
                    </router-link>
                    <router-link to="/admin/catalog/categories" class="ml-3">
                        <v-btn depressed small color="white">
                            Categories
                        </v-btn>
                    </router-link>
                </div>
                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <span>Edit</span>
                </div>

                <div class="row">
                    <div class="col-12 bg-white pb-15">
                        <p class="col-12">Main information</p>
                        <div class="col-12">
                            <v-switch
                                v-model="NewCategoryPublish"
                                label="Publish"
                            ></v-switch>
                        </div>
                        <div class="col-6">
                            <v-text-field
                                label="Offer name"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="col-3">
                            <v-text-field
                                label="Priority (sorting)"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="col-12">
                            <p>Category</p>
                            <div class="row d-flex">
                                <v-checkbox
                                    v-model="OfferCategory"
                                    v-for="item in OffersCategories"
                                    :key="item.name"
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
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="Data, GB"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="SMS"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="Minutes"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <div class="col-12 row">
                            <div class="col-6">
                                <v-text-field
                                    label="Additional Data"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="Int. minutes"
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
                            ></v-textarea>
                        </div>
                        <div class="col-12">
                            <v-checkbox
                                v-model="NewCategoryPublish"
                                label="Special rates abroad"
                                color="indigo darken-3"
                                value="Special rates abroad"
                                class="m-0"
                                hide-details
                            ></v-checkbox>
                        </div>
                        <div class="col-12">
                            <v-checkbox
                                v-model="NewCategoryPublish"
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
                                no-resize
                                hide-details
                                label="Activation info"
                                value=""
                            ></v-textarea>
                        </div>
                        <div class="col-12">
                            <p>Offer overview</p>
                        </div>
                        <div class="col-12">
                            <p>Note</p>
                        </div>
                        <v-divider class="col-12 p-0"></v-divider>
                        <h6 class="col-12">Display options</h6>
                        <div class="col-5">
                            <v-select
                                :items="NewCategoryCardDesign"
                                label="Card design"
                                outlined
                            ></v-select>
                        </div>
                        <div class="row col-12">
                            <div class="col-4">
                                <h6>Photo for list of offers</h6>
                                <span>The photo must be in .jpg or .png format. Size 700*350 pixels</span>
                                <v-text-field
                                    label="Photo URL"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-4">
                                <h6>Photo for Slide on desktop screens</h6>
                                <span>
                                    The photo must be in .jpg or .png format.
                                    For Blue or Orange design -  size 800*800 pixels
                                    For Transparent design - size 1400*800 pixels
                                </span>
                                <v-text-field
                                    label="Photo URL"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-4">
                                <h6>Photo for Slide on mobile screens</h6>
                                <span>
                                    The photo must be in .jpg or .png format.
                                    For Blue or Orange design -  size 450*300 pixels
                                    For Transparent design - size 450*680 pixels
                                </span>
                                <v-text-field
                                    label="Photo URL"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <h6 class="col-12">Where display</h6>
                        <div class="col-12 row">
                            <v-checkbox
                                v-model="ex4"
                                label="in OFFERS PAGE"
                                color="indigo darken-3"
                                value="Per tutti"
                                class="col-3"
                                hide-details
                            ></v-checkbox>
                            <v-checkbox
                                v-model="ex4"
                                label="in HOME PAGE"
                                color="indigo darken-3"
                                value="Per tutti"
                                class="col-3"
                                hide-details
                            ></v-checkbox>
                            <v-checkbox
                                v-model="ex4"
                                label="in SLIDER"
                                color="indigo darken-3"
                                value="Per tutti"
                                class="col-3"
                                hide-details
                            ></v-checkbox>
                        </div>
                        <v-divider class="col-12 p-0"></v-divider>
                        <h6 class="col-12">Tariff transparency</h6>
                        <div class="col-12 row">
                            <v-radio-group row v-model="radioGroup">
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
                                    label="Actication price (for NEW user)"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <v-checkbox
                            v-model="ex4"
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
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-3">
                                <v-text-field
                                    label="Activation price for other operators"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <v-divider class="col-12 p-0 mt-10"></v-divider>
                        <h6 class="col-12">SEO section</h6>
                        <v-text-field
                            label="Title"
                            class="col-5"
                            hide-details="auto"
                        ></v-text-field>
                        <v-textarea
                            outlined
                            name="input-7-4"
                            no-resize
                            hide-details
                            label="Description"
                            value=""
                            class="col-5 mt-10 ml-2"
                        ></v-textarea>
                        <v-textarea
                            outlined
                            name="input-7-4"
                            no-resize
                            hide-details
                            label="Keywords"
                            value=""
                            class="col-5 mt-10 ml-2"
                        ></v-textarea>
                        <v-text-field
                            label="URL"
                            class="col-5"
                            hide-details="auto"
                        ></v-text-field>
                    </div>
                </div>
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
                            depressed>
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
import ApiAdmin from "@/api/ApiAdmin";
import ApiEnter from "@/api/ApiEnter";
import IAdminPanelOffersCategoriesList from "@/struct/admin-panel/IAdminPanelOffersCategoriesList";

@Component({
    components: { StandartTemplate, PageHeader }
})
export default class Offers extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataOffers.OfferCreateBreadcrumbs;

    private NewCategoryPublish: boolean = false
    private NewCategoryCardDesign: string[] = ['Blue', 'Orange', 'Transparent']

    private OfferCategory: any = []

    private OffersCategories: IAdminPanelOffersCategoriesList[] | undefined = []

    private async getOffersCategories(): Promise<void> {
        try {
            this.OffersCategories = await ApiAdmin.GetOfferCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    async mounted() {
        await this.getOffersCategories()
    }
}
</script>
