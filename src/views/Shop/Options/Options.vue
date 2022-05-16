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
                    <router-link to="/shop/options/create">
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed>
                            Add option
                        </v-btn>
                    </router-link>
                </div>

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-switch hide-details v-model="item.publish" :input-value="item.publish" class="mt-0" @change="ChangeOptionPublish(item)"></v-switch>
                                <router-link :to="'/shop/options/edit/' + item.uuid">
                                    <v-btn icon>
                                        <v-icon small color="grey darken-2">
                                            fas fa-pencil-alt
                                        </v-icon>
                                    </v-btn>
                                </router-link>
                                <v-btn icon @click="DeleteOption(item.uuid)">
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
import ApiShopOptions from "@/api/ApiShopOptions";
import ApiEnter from "@/api/ApiEnter";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import IAdminPanelOffersCategoriesList from "@/struct/admin-panel/IAdminPanelOffersCategoriesList";
import DataOptions from "@/data/AdminPanel/DataOptions";
import sweetalert from "sweetalert";

@Component({
    components: { StandartTemplate, PageHeader }
})
export default class Options extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataOptions.Breadcrumbs;
    private TableHeaders: TableHeaderItemType[] = DataOptions.TableHeaders;
    private TableItems: IAdminPanelOffersCategoriesList[] | undefined = [];


    private async GetOptions(): Promise<void> {
        try {
            this.TableItems = await ApiShopOptions.GetOptions(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private DeleteOption(option_uuid: string): void {
        sweetalert({
            title: "Are you sure?",
            text: "You really want to delete Option?",
            icon: "warning",
            buttons: ["No, cancel!", "Yes, delete!"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiShopOptions.DeleteOption(ApiEnter.CurrentSessionUUID as string, option_uuid);
                if (typeof response == "boolean") {
                    await sweetalert({
                        title: "Success!",
                        text: "Option has deleted",
                        icon: "success"
                    });

                    await this.GetOptions()
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
    private async ChangeOptionPublish(item: any): Promise<void> {
        try {
            const response = await ApiShopOptions.UpdateOptionPublish(item.publish? 1: 0, ApiEnter.CurrentSessionUUID as string, item.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Option has updated"
                }).then(() => {
                    this.GetOptions()
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

    public mounted() {
        this.GetOptions();
    }

}
</script>
