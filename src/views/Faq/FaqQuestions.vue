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
                    <v-data-table dense :headers="TableHeaders" :items="TableItems" :items-per-page="15" item-key="user" class="elevation-1">
                        <template v-slot:body="{ item }">
                            <draggable
                                :list="item"
                                tag="tbody">
                                <tr
                                    v-for="(item, index) in item"
                                    :key="index"
                                >
                                    <td>
                                        <v-icon
                                            small
                                            class="page__grab-icon"
                                        >
                                            mdi-arrow-all
                                        </v-icon>
                                    </td>
                                    <td> {{ index + 1 }} </td>
                                    <td> {{ item.first_name }} </td>
                                    <td> {{ item.first_name }} </td>
                                    <td> {{ item.first_name }} </td>
                                    <td> {{ item.first_name }} </td>
                                    <td> {{ item.first_name }} </td>
                                    <td>
                                        <v-btn icon @click="EditUser(item.user_uuid)">
                                            <v-icon>
                                                fas fa-pencil-alt
                                            </v-icon>
                                        </v-btn>
                                        <v-btn icon @click="LoginOnUser(item.email)">
                                            <v-icon>
                                                fas fa-trash-alt
                                            </v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </draggable>
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
import ApiAdmin from "@/api/ApiAdmin";
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
    private FaqItems: IAdminPanelCompanyList[] | undefined = [];
    public isCreating: boolean = false;
    private newQuestion: any = {
        Question: '',
        Answer: ''
    }

    private CreateAnswer(): void {
        this.isCreating = !this.isCreating
    }

    private async SubmitAnswer(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const faq_uuid = await ApiAdmin.CreateFaq(ApiEnter.CurrentSessionUUID, this.newQuestion.Question, this.newQuestion.Answer);
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
                title: "Успех!",
                text: `FAQ успешно создан!`,
                icon: "success"
            })

            this.GetFaq()
            this.newQuestion.Answer = ''
            this.newQuestion.Question = ''
            this.isCreating = false
        }
    }

    private DeleteFaq(faq_uuid: string): void {
        sweetalert({
            title: "Вы уверены?",
            text: "Вы дейсвительно хотите удалить FAQ?",
            icon: "warning",
            buttons: ["Нет, Отмена!", "Да, Подтверждаю!"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiAdmin.DeleteFaq(ApiEnter.CurrentSessionUUID as string, faq_uuid);
                if (typeof response == "boolean") {
                    sweetalert({
                        title: "Успешно!",
                        text: "FAQ удален",
                        icon: "success"
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
            this.FaqItems = await ApiAdmin.GetFaq(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private created(): void {
        this.GetFaq()
    }
}
</script>
