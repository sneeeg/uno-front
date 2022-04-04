<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Options and Services" back-url="/"/>

                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <router-link to="/admin/options/create"></router-link>
                    <v-btn
                        color="orange accent-4"
                        class="white--text"
                        small
                        depressed>
                        Add option
                    </v-btn>
                </div>

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-switch hide-details :input-value="item.publish" class="mt-0"></v-switch>
                                <v-btn icon @click="editOfferCategory(item.uuid)">
                                    <v-icon small color="grey darken-2">
                                        fas fa-pencil-alt
                                    </v-icon>
                                </v-btn>
                                <v-btn icon @click="() => console.log('del')">
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
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import IAdminPanelOffersCategoriesList from "@/struct/admin-panel/IAdminPanelOffersCategoriesList";
import DataOptions from "@/data/AdminPanel/DataOptions";

@Component({
    components: { StandartTemplate, PageHeader }
})
export default class Options extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataOptions.Breadcrumbs;

    private TableHeaders: TableHeaderItemType[] = DataOptions.TableHeaders;
    private TableItems: IAdminPanelOffersCategoriesList[] | undefined = [];


    private async getOffers(): Promise<void> {
        try {
            this.TableItems = await ApiAdmin.GetOfferCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private mounted() {
        this.getOffers();
    }

}
</script>
