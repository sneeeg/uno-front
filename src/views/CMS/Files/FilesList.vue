<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Support (Files)" back-url="/"/>

                <div class="col-12 mt-5">
                    <router-link to="/cms/files">
                        <v-btn depressed small color="light-blue darken-4" class="white--text">
                            Files
                        </v-btn>
                    </router-link>
                    <router-link to="/cms/files/categories" class="ml-3">
                        <v-btn depressed small color="white">
                            Categories
                        </v-btn>
                    </router-link>
                </div>
                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <router-link to="/cms/files/create">
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed>
                            Add File
                        </v-btn>
                    </router-link>
                </div>

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-switch hide-details v-model="item.publish" :input-value="item.publish" class="mt-0" @change="ChangeFilePublish(item)"></v-switch>
                                <router-link :to="'/cms/files/edit/' + item.uuid">
                                    <v-btn icon>
                                        <v-icon small color="grey darken-2">
                                            fas fa-pencil-alt
                                        </v-icon>
                                    </v-btn>
                                </router-link>
                                <v-btn icon @click="DeleteFile(item.uuid)">
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
import ApiSupportFiles from "@/api/ApiSupportFiles";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import IAdminPanelCompanyList from "@/struct/admin-panel/IAdminPanelCompanyList";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import DataFaq from "@/data/AdminPanel/DataFaq";
import DataSupportFiles from "@/data/Files/DataSupportFiles";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class FaqEdit extends Vue {

    private Breadcrumbs: BreadcrumbsItemType[] = DataSupportFiles.FilesListBreadcrumbs;

    private TableHeaders: TableHeaderItemType[] = DataSupportFiles.FilesListTableHeaders;
    private TableItems: any[] | undefined = [];

    private async ChangeFilePublish(item: any): Promise<void> {
        try {
            const response = await ApiSupportFiles.UpdateFilePublish(item.publish? 1: 0, ApiEnter.CurrentSessionUUID as string, item.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Faq has updated"
                }).then(() => {
                    this.GetFiles()
                });
            } else {
                sweetalert({
                    title: "Ошибка!",
                    text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            sweetalert({
                title: "Ошибка!",
                text: "Во время выполнения запроса, возникла ошибка!",
                icon: "error"
            });
        }
    }

    private DeleteFile(file_uui: string): void {
        sweetalert({
            title: "Are you sure?",
            text: "You really want to delete this File?",
            buttons: ["No, Cancel!", "Yes, I'm sure!"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiSupportFiles.DeleteFile(ApiEnter.CurrentSessionUUID as string, file_uui);
                if (typeof response == "boolean") {
                    sweetalert({
                        title: "Success!",
                        text: "File has deleted"
                    });

                    this.GetFiles()
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

    private async GetFiles(): Promise<void> {
        try {
            this.TableItems = await ApiSupportFiles.GetFiles(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    public mounted(): void {
        this.GetFiles()
    }
}
</script>
