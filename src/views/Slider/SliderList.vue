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
                        <template v-slot:item.create_at="{ item }">
                            {{ formatDate(item.create_at) }}
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-switch hide-details v-model="item.publish" :input-value="item.publish" class="mt-0" @change="ChangeSliderPublish(item)"></v-switch>
                                <router-link :to="'/slider/edit/' + item.uuid">
                                    <v-btn icon>
                                        <v-icon small color="grey darken-2">
                                            fas fa-pencil-alt
                                        </v-icon>
                                    </v-btn>
                                </router-link>
                                <v-btn icon @click="DeleteSlider(item.uuid)">
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
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import IAdminPanelCompanyList from "@/struct/admin-panel/IAdminPanelCompanyList";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import DataSlider from "@/data/Slider/DataSlider";
import ApiSlider from "@/api/ApiSlider";
import dayjs from "dayjs";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class SliderList extends Vue {

    private Breadcrumbs: BreadcrumbsItemType[] = DataSlider.SliderListBreadcrumbs;
    private TableHeaders: TableHeaderItemType[] = DataSlider.SliderListTableHeaders;
    private TableItems: IAdminPanelCompanyList[] | undefined = [];

    private DeleteSlider(slider_uuid: string): void {
        sweetalert({
            title: "Are you sure?",
            text: "You really want to delete Slider?",
            icon: "warning",
            buttons: ["No, cancel!", "Yes, delete!"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiSlider.DeleteSlider(ApiEnter.CurrentSessionUUID as string, slider_uuid);
                if (typeof response == "boolean") {
                    await sweetalert({
                        title: "Успешно!",
                        text: "FAQ удален",
                        icon: "success"
                    });

                    await this.GetSlider()
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

    private async GetSlider(): Promise<void> {
        try {
            this.TableItems = await ApiSlider.GetSlider(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private async ChangeSliderPublish(item: any): Promise<void> {
        try {
            const response = await ApiSlider.UpdateSliderPublish(item.publish? 1: 0, ApiEnter.CurrentSessionUUID as string, item.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Slider has updated"
                }).then(() => {
                    this.GetSlider()
                });
            } else {
                await sweetalert({
                    title: "Ошибка!",
                    text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            await sweetalert({
                title: "Ошибка!",
                text: "Во время выполнения запроса, возникла ошибка!",
                icon: "error"
            });
        }
    }

    public created(): void {
        this.GetSlider()
    }

    private formatDate(item: string) {
        return dayjs(item).format('DD.MM.YYYY')
    }
}
</script>
