<template>
    <standart-template>
        <div class="container">
            <v-dialog
                v-model="isOpenDialog"
                persistent
                max-width="500"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        <span>Category</span>
                        <v-spacer></v-spacer>
                        <v-btn icon depressed @click="DialogToggle">
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div class="col-12 d-flex">
                            <span class="font-weight-medium">Created</span>
                            <p class="ml-10 mb-0">{{ CategoryCreated }}</p>
                        </div>
                        <div class="col-12 pt-0">
                            <v-switch
                                v-model="NewCategoryPublish"
                                label="Publish"
                                class="mt-0"
                                hide-details
                            ></v-switch>
                        </div>
                        <div class="col-12">
                            <v-text-field
                                label="Category name"
                                v-model="NewCategoryName"
                                outlined
                                dense
                                hide-details
                            ></v-text-field>
                        </div>
                        <div class="col-4">
                            <v-text-field
                                label="Priority (sorting)"
                                v-model="NewCategoryPriority"
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
                            @click="DialogToggle"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed
                            @click="createCategory"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Offers" back-url="/"/>

                <div class="col-12 mt-5">
                    <router-link to="/admin/catalog/offers">
                        <v-btn depressed small color="white">
                            Offers
                        </v-btn>
                    </router-link>
                    <router-link to="/admin/catalog/categories" class="ml-3">
                        <v-btn depressed small color="light-blue darken-4" class="white--text">
                            Categories
                        </v-btn>
                    </router-link>
                </div>
                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <v-btn
                        color="orange accent-4"
                        class="white--text"
                        small
                        depressed
                        @click="DialogToggle">
                        Add category
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
import dayjs from "dayjs";
import DataOffersCategories from "@/data/AdminPanel/DataOffersCategories";
import sweetalert from "sweetalert";
import IAdminPanelOffersCategoriesList from "@/struct/admin-panel/IAdminPanelOffersCategoriesList";

@Component({
    components: { StandartTemplate, PageHeader }
})
export default class Options extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataOffersCategories.Breadcrumbs;

    private TableHeaders: TableHeaderItemType[] = DataOffersCategories.TableHeaders;

    private TableItems: IAdminPanelOffersCategoriesList[] | undefined = [];

    private isOpenDialog: boolean = false

    private NewCategoryPublish: boolean = false
    private NewCategoryName: string = ''
    private NewCategoryPriority: string = ''
    private CategoryCreated: string = ''


    private async getOffers(): Promise<void> {
        try {
            this.TableItems = await ApiAdmin.GetOfferCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private async getOfferCategory(uuid: string): Promise<void> {
        const offerCategoryInfo: any = await ApiAdmin.GetOfferCategoryByUUID(ApiEnter.CurrentSessionUUID as string , uuid);
        if (offerCategoryInfo == undefined) {
            await sweetalert({
                title: "Упс!",
                text: "Во время загрузки информации - возникла ошибка, не все данные были заружены!",
                icon: "error"
            })
            return;
        }
        this.NewCategoryPublish = offerCategoryInfo.publish
        this.NewCategoryPriority = offerCategoryInfo.priority
        this.NewCategoryName = offerCategoryInfo.name
        this.CategoryCreated = dayjs(offerCategoryInfo.create_at).format('DD.MM.YYYY HH:mm')
    }

    private DialogToggle(): void {
        if(this.isOpenDialog) {
            this.NewCategoryPublish = false
            this.NewCategoryPriority = ''
            this.NewCategoryName = ''
            this.CategoryCreated = ''
        }
        this.isOpenDialog = !this.isOpenDialog
    }

    private async createCategory(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            const offer_category_uuid = await ApiAdmin.CreateOfferCategory(ApiEnter.CurrentSessionUUID as string, this.NewCategoryName, this.NewCategoryPublish? 1: 0, this.NewCategoryPriority);
            if (offer_category_uuid == undefined || offer_category_uuid.length != 36) {
                await sweetalert({
                    title: "Ошибка запроса!",
                    text: "Ошибка создания Offer category: " + offer_category_uuid,
                    icon: "info"
                });
                return;
            }

            sweetalert({
                title: "Успех!",
                text: `Offer category успешно создан!`,
                icon: "success"
            })

            this.NewCategoryName = ''
            this.NewCategoryPublish = false
            this.NewCategoryPriority = ''
        }
    }

    private editOfferCategory(uuid: string): void {
        this.DialogToggle()
        this.getOfferCategory(uuid)
    }


    private mounted() {
        this.getOffers();
    }

}
</script>
