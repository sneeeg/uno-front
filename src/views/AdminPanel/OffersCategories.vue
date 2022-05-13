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
                        <v-btn icon depressed @click="OpenDialog">
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div class="col-12 d-flex">
                            <span class="font-weight-medium">Created</span>
                            <p class="ml-10 mb-0">{{ newCategory.created }}</p>
                        </div>
                        <div class="col-12 pt-0">
                            <v-switch
                                v-model="newCategory.publish"
                                label="Publish"
                                class="mt-0"
                                hide-details
                            ></v-switch>
                        </div>
                        <div class="col-12">
                            <v-text-field
                                label="Category name"
                                v-model="newCategory.name"
                                outlined
                                dense
                                hide-details
                            ></v-text-field>
                        </div>
                        <div class="col-4">
                            <v-text-field
                                label="Priority (sorting)"
                                v-model="newCategory.priority"
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
                            @click="OpenDialog"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed
                            :disabled="newCategory.name === '' || newCategory.priority === ''"
                            @click="CreateFaqCategory"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="isOpenEditDialog"
                persistent
                max-width="500"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        <span>Category</span>
                        <v-spacer></v-spacer>
                        <v-btn icon depressed @click="ToggleEditDialog">
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div class="col-12 d-flex">
                            <span class="font-weight-medium">Created</span>
                            <p class="ml-10 mb-0">{{ currentCategory.created }}</p>
                        </div>
                        <div class="col-12 pt-0">
                            <v-switch
                                v-model="currentCategory.publish"
                                label="Publish"
                                class="mt-0"
                                hide-details
                            ></v-switch>
                        </div>
                        <div class="col-12">
                            <v-text-field
                                label="Category name"
                                v-model="currentCategory.name"
                                outlined
                                dense
                                hide-details
                            ></v-text-field>
                        </div>
                        <div class="col-4">
                            <v-text-field
                                label="Priority (sorting)"
                                v-model="currentCategory.priority"
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
                            @click="ToggleEditDialog"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed
                            :disabled="currentCategory.name === '' || currentCategory.priority === ''"
                            @click="ChangeFaqCategoryInfo"
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
                    <router-link to="/shop/offers">
                        <v-btn depressed small color="white">
                            Offers
                        </v-btn>
                    </router-link>
                    <router-link to="/shop/offers/categories" class="ml-3">
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
                    <v-data-table dense :headers="TableHeaders" sort-by="priority" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-switch hide-details v-model="item.publish" :input-value="item.publish" class="mt-0" @change="ChangeOfferCategoryPublish(item)"></v-switch>
                                <v-btn icon @click="openEditDialog(item.uuid)">
                                    <v-icon small color="grey darken-2">
                                        fas fa-pencil-alt
                                    </v-icon>
                                </v-btn>
                                <v-btn icon @click="DeleteCategory(item.uuid)">
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
import ApiOffer from "@/api/ApiOffer";
import ApiEnter from "@/api/ApiEnter";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import dayjs from "dayjs";
import DataOffersCategories from "@/data/AdminPanel/DataOffersCategories";
import sweetalert from "sweetalert";
import IAdminPanelOffersCategoriesList from "@/struct/admin-panel/IAdminPanelOffersCategoriesList";

@Component({
    components: { StandartTemplate, PageHeader }
})
export default class OffersCategories extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataOffersCategories.Breadcrumbs;
    private TableHeaders: TableHeaderItemType[] = DataOffersCategories.TableHeaders;
    private TableItems: IAdminPanelOffersCategoriesList[] | undefined = [];

    public isOpenDialog: boolean = false;
    private isOpenEditDialog: boolean = false;
    private newCategory: any = {
        name: '',
        priority: '',
        publish: true,
        created: '',
    }
    private currentCategory: any = {
        name: '',
        priority: '',
        publish: true,
        created: '',
        uuid: ''
    }

    private OpenDialog(): void {
        this.isOpenDialog = !this.isOpenDialog
        this.newCategory.name = ''
        this.newCategory.priority = ''
        this.newCategory.publish = true
        this.newCategory.created = ''
    }

    public ToggleEditDialog(): void {
        this.isOpenEditDialog = !this.isOpenEditDialog
    }

    private async openEditDialog(uuid: string): Promise<void> {
        this.currentCategory.uuid = uuid
        const categoryInfo: any = await ApiOffer.GetOfferCategoryByUUID(ApiEnter.CurrentSessionUUID as string, uuid);
        if (categoryInfo == undefined) {
            await sweetalert({
                title: "Oop!",
                text: "At the time of uploading the information - an error occurred, not all data were loaded!",
                icon: "error"
            })
            return;
        }

        this.ToggleEditDialog()

        this.currentCategory.name = categoryInfo.name
        this.currentCategory.priority = categoryInfo.priority
        this.currentCategory.publish = categoryInfo.publish
        this.currentCategory.created = dayjs(categoryInfo.create_at).format('DD.MM.YYYY')
    }

    private async getOffers(): Promise<void> {
        try {
            this.TableItems = await ApiOffer.GetOfferCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private async ChangeOfferCategoryPublish(item: any): Promise<void> {
        try {
            const response = await ApiOffer.UpdateOfferCategoryPublish(item.publish? 1: 0, ApiEnter.CurrentSessionUUID as string, item.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Offer Category has updated"
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

    private DeleteCategory(uuid: string): void {
        sweetalert({
            title: "Are you sure?",
            text: "Do you really want to delete it?",
            icon: "warning",
            buttons: ["No, cancel", "Yes, I'm sure"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiOffer.DeleteOfferCategory(ApiEnter.CurrentSessionUUID as string, uuid);
                if (typeof response == "boolean") {
                    await sweetalert({
                        title: "Success!",
                        text: "Offer Category has deleted",
                        icon: "success"
                    });

                    await this.getOffers();
                } else {
                    await sweetalert({
                        title: "Ошибка!",
                        text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                        icon: "error"
                    });
                }
            }
        });
    }

    private DialogToggle(): void {
        if(this.isOpenDialog) {
            this.newCategory.publish = false
            this.newCategory.priority = ''
            this.newCategory.name = ''
            this.newCategory.created = ''
        }
        this.isOpenDialog = !this.isOpenDialog
    }

    private async CreateFaqCategory(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const file_uuid = await ApiOffer.CreateOfferCategory(ApiEnter.CurrentSessionUUID, this.newCategory.name, this.newCategory.priority, this.newCategory.publish? 1: 0);
            if (file_uuid == undefined || file_uuid.length != 36) {
                await sweetalert({
                    title: "Request error!",
                    text: "Creation error: " + file_uuid,
                    icon: "info"
                });
                return;
            }
            this.$forceUpdate();

            sweetalert({
                title: "Success!",
                text: `Offer category has created!`,
                icon: "success"
            }).then(() => this.OpenDialog())

            await this.getOffers()
        }
    }

    private async ChangeFaqCategoryInfo(): Promise<void> {
        try {
            const response = await ApiOffer.UpdateOfferCategoryInfo(this.currentCategory.name, this.currentCategory.priority, this.currentCategory.publish? 1: 0, ApiEnter.CurrentSessionUUID as string, this.currentCategory.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Offer Category has updated"
                }).then(() => {
                    this.ToggleEditDialog()
                    this.getOffers()
                });
            } else {
                sweetalert({
                    title: "Error!",
                    text: `Request error: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            sweetalert({
                title: "Error!",
                text: "Request error!",
                icon: "error"
            });
        }
    }

    public mounted() {
        this.getOffers();
    }



}
</script>
