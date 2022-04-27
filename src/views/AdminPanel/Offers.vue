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
                    <router-link to="/admin/catalog/offers/create">
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
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-switch hide-details v-model="item.publish" :input-value="item.publish" class="mt-0" @change="ChangeSliderPublish(item)"></v-switch>
                                <router-link :to="'/admin/catalog/offers/edit/' + item.uuid">
                                    <v-btn icon>
                                        <v-icon small color="grey darken-2">
                                            fas fa-pencil-alt
                                        </v-icon>
                                    </v-btn>
                                </router-link>
                                <v-btn icon @click="deleteOffer(item.uuid)">
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
import ApiAdmin from "@/api/ApiAdmin";
import ApiEnter from "@/api/ApiEnter";
import IAdminPanelUserList from "@/struct/admin-panel/IAdminPanelUserList";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import DataOffers from "@/data/AdminPanel/DataOffers";
import ApiOffer from "@/api/ApiOffer";
import sweetalert from "sweetalert";
import ApiSupportFiles from "@/api/ApiSupportFiles";

@Component({
    components: { StandartTemplate, PageHeader }
})
export default class Offers extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataOffers.Breadcrumbs;
    private TableHeaders: TableHeaderItemType[] = DataOffers.TableHeaders;
    private TableItems: IAdminPanelUserList[] | undefined = [];

    private async getOffers(): Promise<void> {
        try {
            this.TableItems = await ApiOffer.GetOffers(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }
    private deleteOffer(offer_uuid: string): void {
        sweetalert({
            title: "Are you sure?",
            text: "You really want to delete this Offer?",
            buttons: ["No, Cancel!", "Yes, I'm sure!"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiOffer.DeleteOffer(ApiEnter.CurrentSessionUUID as string, offer_uuid);
                if (typeof response == "boolean") {
                    sweetalert({
                        title: "Success!",
                        text: "Offer has deleted"
                    });

                    this.getOffers()
                } else {
                    sweetalert({
                        title: "Ошибка!",
                        text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                        icon: "error"
                    });
                }
            }
        });
    }

    public mounted() {
        this.getOffers();
    }

}
</script>
