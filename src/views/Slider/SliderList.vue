<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Slider" back-url="/"/>

                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <router-link to="/slider/create">
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed>
                            Add slide
                        </v-btn>
                    </router-link>
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
                                <v-btn icon @click="DeleteQuestion(item.uuid)">
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
import DataSlider from "@/data/Slider/DataSlider";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class SliderList extends Vue {

    private Breadcrumbs: BreadcrumbsItemType[] = DataSlider.SliderListBreadcrumbs;
    private TableHeaders: TableHeaderItemType[] = DataSlider.SliderListTableHeaders;
    private TableItems: IAdminPanelCompanyList[] | undefined = [];

    private DeleteFaq(faq_uuid: string): void {
        sweetalert({
            title: "Вы уверены?",
            text: "Вы дейсвительно хотите удалить FAQ?",
            icon: "warning",
            buttons: ["Нет, Отмена!", "Да, Подтверждаю!"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiFaq.DeleteFaqCategory(ApiEnter.CurrentSessionUUID as string, faq_uuid);
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
            this.TableItems = await ApiFaq.GetFaq(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    public created(): void {
        this.GetFaq()
    }
}
</script>
