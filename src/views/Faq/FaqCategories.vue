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
                            <p class="ml-10 mb-0">{{ CategoryCreated }}</p>
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
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Support (FAQ)" back-url="/"/>

                <div class="col-12 mt-5">
                    <router-link to="/faq/questions">
                        <v-btn depressed small color="white">
                            Questions
                        </v-btn>
                    </router-link>
                    <router-link to="/faq/categories" class="ml-3">
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
                        @click="OpenDialog"
                        depressed>
                        Add Category
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
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import sweetalert from "sweetalert";
import ApiEnter from "@/api/ApiEnter";
import ApiFaq from "@/api/ApiFaq";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import IAdminPanelCompanyList from "@/struct/admin-panel/IAdminPanelCompanyList";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import DataFaq from "@/data/AdminPanel/DataFaq";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class FaqEdit extends Vue {

    private Breadcrumbs: BreadcrumbsItemType[] = DataFaq.FaqQuestionsBreadcrumbs;

    private TableHeaders: TableHeaderItemType[] = DataFaq.CategoriesTableHeaders;
    private TableItems: IAdminPanelCompanyList[] | undefined = [];

    public isOpenDialog: boolean = false;
    private newCategory: any = {
        name: '',
        priority: '',
        publish: true
    }

    private OpenDialog(): void {
        this.isOpenDialog = !this.isOpenDialog
    }

    private async CreateFaqCategory(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const faq_uuid = await ApiFaq.CreateFaqCategory(ApiEnter.CurrentSessionUUID, this.newCategory.name, this.newCategory.priority, this.newCategory.publish? 1: 0);
            if (faq_uuid == undefined || faq_uuid.length != 36) {
                sweetalert({
                    title: "Ошибка запроса!",
                    text: "Ошибка создания FAQ: " + faq_uuid,
                    icon: "info"
                });
                return;
            }
            this.$forceUpdate();

            sweetalert({
                title: "Success!",
                text: `FAQ category has created!`,
                icon: "success"
            }).then(() => this.isOpenDialog = false)

            await this.GetFaqCategories()
            this.newCategory.name = ''
            this.newCategory.priority = ''
            this.newCategory.publish = true
        }
    }

    private DeleteCategory(faq_uuid: string): void {
        sweetalert({
            title: "Are you sure?",
            text: "Do you really want to delete it?",
            icon: "warning",
            buttons: ["No, cancel", "Yes, I'm sure"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiFaq.DeleteFaqCategory(ApiEnter.CurrentSessionUUID as string, faq_uuid);
                if (typeof response == "boolean") {
                    sweetalert({
                        title: "Success!",
                        text: "FAQ Category has deleted",
                        icon: "success"
                    });

                    await this.GetFaqCategories()
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

    private async GetFaqCategories(): Promise<void> {
        try {
            this.TableItems = await ApiFaq.GetFaqCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    public created(): void {
        this.GetFaqCategories()
    }
}
</script>
