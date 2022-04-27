<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Support (FAQ)" back-url="/"/>

                <div class="col-12 mt-5">
                    <router-link to="/faq/questions">
                        <v-btn depressed small color="light-blue darken-4" class="white--text">
                            Questions
                        </v-btn>
                    </router-link>
                    <router-link to="/faq/categories" class="ml-3">
                        <v-btn depressed small color="white">
                            Categories
                        </v-btn>
                    </router-link>
                </div>
                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <router-link to="/faq/questions/create">
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed>
                            Add Questions
                        </v-btn>
                    </router-link>
                </div>

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" sort-by="priority" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.category="{ item }">
                            {{ FaqCategories.find(i => i.uuid === item.category).name }}
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-switch hide-details v-model="item.publish" :input-value="item.publish" class="mt-0" @change="ChangeFaqPublish(item)"></v-switch>
                                <router-link :to="'/faq/questions/edit/' + item.uuid">
                                    <v-btn icon>
                                        <v-icon small color="grey darken-2">
                                            fas fa-pencil-alt
                                        </v-icon>
                                    </v-btn>
                                </router-link>
                                <v-btn icon @click="DeleteFaq(item.uuid)">
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

    private TableHeaders: TableHeaderItemType[] = DataFaq.QuestionsTableHeaders;

    private Breadcrumbs: BreadcrumbsItemType[] = DataFaq.FaqQuestionsBreadcrumbs;
    private TableItems: IAdminPanelCompanyList[] | undefined = [];
    private FaqCategories: any[] | undefined = []

    private async ChangeFaqPublish(item: any): Promise<void> {
        try {
            const response = await ApiFaq.UpdateFaqPublish(item.publish? 1: 0, ApiEnter.CurrentSessionUUID as string, item.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Faq has updated"
                }).then(() => {
                    this.GetFaq()
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

    private DeleteFaq(faq_uuid: string): void {
        sweetalert({
            title: "Are you sure?",
            text: "You really want to delete this Question?",
            buttons: ["No, Cancel!", "Yes, I'm sure!"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiFaq.DeleteFaqQuestion(ApiEnter.CurrentSessionUUID as string, faq_uuid);
                if (typeof response == "boolean") {
                    sweetalert({
                        title: "Success!",
                        text: "FAQ Question has deleted"
                    });

                    this.GetFaq()
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

    private async GetFaq(): Promise<void> {
        try {
            this.TableItems = await ApiFaq.GetFaq(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }
    private async GetFaqCategories(): Promise<void> {
        try {
            this.FaqCategories = await ApiFaq.GetFaqCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    public mounted(): void {
        this.GetFaqCategories()
        this.GetFaq()
    }
}
</script>
