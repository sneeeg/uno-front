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

                <div class="col-12">
                    <router-link to="/shop/offers/create">
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed>
                            Add offer
                        </v-btn>
                    </router-link>
                </div>

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.category="{ item }">
                            {{ SetCategories(item) }}
                        </template>
                        <template v-slot:item.active="{ item }">
                            {{ item.active? 'Offerte attivabili' : 'Offerte non più attivabili' }}
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-switch hide-details v-model="item.publish" inset :input-value="item.publish" class="mt-0" @change="ChangePublish(item)"></v-switch>
                                <router-link :to="'/shop/offers/edit/' + item.uuid">
                                    <v-btn icon>
                                        <v-icon small color="grey darken-2">
                                            fas fa-pencil-alt
                                        </v-icon>
                                    </v-btn>
                                </router-link>
                                <v-btn icon @click="DeleteItem(item.uuid)">
                                    <v-icon small color="red darken-3">
                                        far fa-trash-alt
                                    </v-icon>
                                </v-btn>
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
import PageHeader from "@/components/UI/PageHeader.vue";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import ApiEnter from "@/api/ApiEnter";
import IAdminPanelUserList from "@/struct/admin-panel/IAdminPanelUserList";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import DataOffers from "@/data/AdminPanel/DataOffers";
import ApiOffer from "@/api/ApiOffer";
import sweetalert from "sweetalert";
import IAdminPanelOffersCategoriesList from "@/struct/admin-panel/IAdminPanelOffersCategoriesList";

@Component({
    components: { StandartTemplate, PageHeader }
})
export default class Offers extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataOffers.Breadcrumbs;
    private TableHeaders: TableHeaderItemType[] = DataOffers.TableHeaders;
    private TableItems: IAdminPanelUserList[] | undefined = [];
    private OffersCategories: IAdminPanelOffersCategoriesList[] | undefined = []


    private async getOffersCategories(): Promise<void> {
        try {
            this.OffersCategories = await ApiOffer.GetOfferCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }
    private async getOffers(): Promise<void> {
        try {
            this.TableItems = await ApiOffer.GetOffers(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }
    private async ChangePublish(item: any): Promise<void> {
        try {
            const response = await ApiOffer.UpdateOfferPublish(item.publish? 1: 0, ApiEnter.CurrentSessionUUID as string, item.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Offer has updated"
                }).then(() => {
                    this.getOffers();
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
    private async DeleteItem(offer_uuid: string): Promise<void> {
        sweetalert({
            title: "Are you sure?",
            text: "You really want to delete this Offer?",
            buttons: ["No, Cancel!", "Yes, I'm sure!"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiOffer.DeleteOffer(ApiEnter.CurrentSessionUUID as string, offer_uuid);
                if (typeof response == "boolean") {
                    await sweetalert({
                        title: "Success!",
                        text: "Offer has deleted"
                    });

                    await this.getOffers()
                } else {
                    await sweetalert({
                        title: "Error!",
                        text: `Request error: ${response}`,
                        icon: "error"
                    });
                }
            }
        });
    }
    private SetCategories(item: any) {
        const uuids = item.category.split(",")
        const names = uuids.map((i: string) => this.OffersCategories?.find(category => category.uuid === i)?.name)
        return names.join(', ')
    }

    public mounted() {
        this.getOffersCategories()
        this.getOffers();
    }

}
</script>
