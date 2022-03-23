<template>
    <div class="page-container">
        <standart-template>
            <div class="container">
                <div class="row mt-1">
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                    <page-header title="Редактирование FAQ"></page-header>
                </div>
                <div class="row mt-5">
                    <div class="col-12">
                        <div class="well">
                            <v-expansion-panels v-if="FaqItems">
                                <v-expansion-panel
                                    v-for="(item,i) in FaqItems"
                                    :key="i"
                                >
                                    <div class="col-12">
                                        <div class="row">
                                            <v-expansion-panel-header class="col-11">
                                                {{ item.answer }}
                                            </v-expansion-panel-header>
                                            <div class="col-1">
                                                <v-btn
                                                    icon
                                                    small
                                                    @click="DeleteFaq(item.uuid)">
                                                    <v-icon small>
                                                        fas fa-trash
                                                    </v-icon>
                                                </v-btn>
                                            </div>
                                        </div>
                                    </div>
                                    <v-expansion-panel-content>
                                        {{ item.question }}
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                    </div>
                </div>
                <div class="col-12 justify-center d-flex mt-10" v-if="!isCreating">
                    <v-btn color="primary" @click="CreateAnswer()">Create question</v-btn>
                </div>
                <div class="col-12" v-if="isCreating">
                    <div class="well">
                        <div class="well-wrapper">
                            <div class="col-12">
                                <v-text-field
                                    label="Question"
                                    v-model="newQuestion.Question"
                                ></v-text-field>
                            </div>
                            <div class="col-12">
                                <v-textarea
                                    name="input-7-1"
                                    label="Answer"
                                    v-model="newQuestion.Answer"
                                ></v-textarea>
                            </div>
                            <div class="row mt-3 align-center">
                                <div class="btn-group justify-center">
                                    <v-btn color="success" @click="SubmitAnswer">Create</v-btn>
                                    <v-btn
                                    @click="CreateAnswer()"
                                    class="ml-2">
                                        Cancel
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </standart-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import DataUserEditProfilePage from "@/data/Profile/DataUserEditProfilePage";
import sweetalert from "sweetalert";
import ApiEnter from "@/api/ApiEnter";
import ApiAdmin from "@/api/ApiAdmin";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import IAdminPanelCompanyList from "@/struct/admin-panel/IAdminPanelCompanyList";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class FaqEdit extends Vue {

    private Breadcrumbs: BreadcrumbsItemType[] = DataUserEditProfilePage.Breadcrumbs;
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
