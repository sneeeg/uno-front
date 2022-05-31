<template>
    <standart-template>
        <div class="container">
            <v-dialog
                v-model="isOpenSliderDialog"
                persistent
                max-width="500"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        <span>SLIDE</span>
                        <v-spacer></v-spacer>
                        <v-btn icon depressed @click="CloseSliderDialog">
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div class="col-12 d-flex">
                            <span class="font-weight-medium">Source</span>
                            <p class="ml-10 mb-0">Slider</p>
                        </div>
                        <div class="col-12 d-flex">
                            <span class="font-weight-medium">Title</span>
                            <p class="ml-10 mb-0">{{ editSlider.name }}</p>
                        </div>
                        <div class="col-4">
                            <v-text-field
                                label="Priority (sorting)"
                                v-model="editSlider.priority"
                                type="number"
                                outlined
                                dense
                            ></v-text-field>
                        </div>
                    </v-card-text>
                    <v-card-actions class="py-6">
                        <v-spacer></v-spacer>
                        <v-btn
                            color="grey lighten-1"
                            class="white--text"
                            small
                            depressed
                            @click="CloseSliderDialog"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed
                            :disabled="editSlider.priority === ''"
                            @click="UpdateSliderSort"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="isOpenOfferDialog"
                persistent
                max-width="500"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        <span>Slider sorting</span>
                        <v-spacer></v-spacer>
                        <v-btn icon depressed @click="CloseOfferDialog">
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div class="col-12 d-flex">
                            <span class="font-weight-medium">Source</span>
                            <p class="ml-10 mb-0">Offer</p>
                        </div>
                        <div class="col-12 d-flex">
                            <span class="font-weight-medium">Title</span>
                            <p class="ml-10 mb-0">{{ editOffer.name }}</p>
                        </div>
                        <div class="col-4">
                            <v-text-field
                                label="Priority (sorting)"
                                v-model="editOffer.priority"
                                type="number"
                                outlined
                                dense
                            ></v-text-field>
                        </div>
                    </v-card-text>
                    <v-card-actions class="py-6">
                        <v-spacer></v-spacer>
                        <v-btn
                            color="grey lighten-1"
                            class="white--text"
                            small
                            depressed
                            @click="CloseOfferDialog"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed
                            :disabled="editOffer.priority === ''"
                            @click="UpdateOfferSort"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Slider" back-url="/"/>
                <div class="col-12 mt-5">
                    <router-link to="/slider/slides">
                        <v-btn depressed small color="white">
                            Slides
                        </v-btn>
                    </router-link>
                    <router-link to="/slider/display-settings" class="ml-3">
                        <v-btn depressed small color="light-blue darken-4" class="white--text">
                            Display settings
                        </v-btn>
                    </router-link>
                </div>

                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <p>Controlling the display order of slides in the Slider on the Main page. <br>
                        Here is the list of active slides in the slider and offers that should be displayed in the slider.</p>
                </div>

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" sort-by="slider_sort" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.from="{ item }">
                            {{ item.image? 'Slider' : 'Offer' }}
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <button v-if="item.image" @click="OpenSliderDialog(item)">
                                    <v-btn icon>
                                        <v-icon small color="grey darken-2">
                                            fas fa-pencil-alt
                                        </v-icon>
                                    </v-btn>
                                </button>
                                <button v-else @click="OpenOfferDialog(item)">
                                    <v-btn icon>
                                        <v-icon small color="grey darken-2">
                                            fas fa-pencil-alt
                                        </v-icon>
                                    </v-btn>
                                </button>
                            </div>
                        </template>
                    </v-data-table>
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
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import IAdminPanelCompanyList from "@/struct/admin-panel/IAdminPanelCompanyList";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import DataSlider from "@/data/Slider/DataSlider";
import ApiSlider from "@/api/ApiSlider";
import ApiOffer from "@/api/ApiOffer";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class SliderList extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataSlider.SliderListBreadcrumbs;
    private TableHeaders: TableHeaderItemType[] = DataSlider.SliderDisplayTableHeaders;
    private TableItems: IAdminPanelCompanyList[] | undefined = [];

    private isOpenSliderDialog: boolean = false
    private isOpenOfferDialog: boolean = false
    private editSlider = {
        uuid: '',
        name: '',
        priority: '',
    }

    private editOffer = {
        uuid: '',
        name: '',
        priority: '',
    }

    private CloseSliderDialog() {
        this.editSlider.uuid = ''
        this.editSlider.name = ''
        this.editSlider.priority = ''
        this.isOpenSliderDialog = false
    }

    private CloseOfferDialog() {
        this.editOffer.uuid = ''
        this.editOffer.name = ''
        this.editOffer.priority = ''
        this.isOpenOfferDialog = false
    }
    private async OpenSliderDialog(item: any): Promise<void> {
        if (item) {
            this.editSlider.uuid = item.uuid
            this.editSlider.name = ''
            this.editSlider.priority = ''
            this.isOpenSliderDialog = !this.isOpenSliderDialog
            const sliderInfo: any = await ApiSlider.GetSliderByUUID(ApiEnter.CurrentSessionUUID as string, this.editSlider.uuid);
            if (sliderInfo == undefined) {
                sweetalert({
                    title: "Oop!",
                    text: "Request error, not all data was loaded!",
                    icon: "error"
                }).then(() => {
                    this.CloseSliderDialog()
                });
                return;
            }
            this.editSlider.name = sliderInfo.name
            this.editSlider.priority = sliderInfo.slider_sort
        } else {
            this.isOpenSliderDialog = !this.isOpenSliderDialog
        }
    }
    private async OpenOfferDialog(item: any): Promise<void> {
        if (item) {
            this.editOffer.uuid = item.uuid
            this.editOffer.name = ''
            this.editOffer.priority = ''
            this.isOpenOfferDialog = !this.isOpenOfferDialog
            const offerInfo: any = await ApiOffer.GetOfferByUUID(ApiEnter.CurrentSessionUUID as string, this.editOffer.uuid);
            if (offerInfo == undefined) {
                sweetalert({
                    title: "Oop!",
                    text: "Request error, not all data was loaded!",
                    icon: "error"
                }).then(() => {
                    this.CloseOfferDialog();
                });
                return;
            }
            this.editOffer.name = offerInfo.name
            this.editOffer.priority = offerInfo.slider_sort
        } else {
            this.isOpenOfferDialog = !this.isOpenOfferDialog
        }
    }
    private async UpdateSliderSort(): Promise<void> {
        try {
            const response = await ApiSlider.UpdateSliderSort(this.editSlider.priority, ApiEnter.CurrentSessionUUID as string, this.editSlider.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Slider Sort has updated"
                }).then(() => {
                    this.CloseSliderDialog()
                    this.GetSlider()
                });
            } else {
                await sweetalert({
                    title: "Error!",
                    text: `Request error: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            await sweetalert({
                title: "Error!",
                text: "Request error!",
                icon: "error"
            });
        }
    }
    private async UpdateOfferSort(): Promise<void> {
        try {
            const response = await ApiSlider.UpdateOfferSort(this.editOffer.priority, ApiEnter.CurrentSessionUUID as string, this.editOffer.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Slider Sort has updated"
                }).then(() => {
                    this.CloseOfferDialog()
                    this.GetSlider()
                });
            } else {
                await sweetalert({
                    title: "Error!",
                    text: `Request error: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            await sweetalert({
                title: "Error!",
                text: "Request error!",
                icon: "error"
            });
        }
    }


    private async GetSlider(): Promise<void> {
        try {
            this.TableItems = await ApiSlider.GetSliderDisplay(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    public created(): void {
        this.GetSlider()
    }
}
</script>
