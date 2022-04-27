<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Slider" back-url="/"/>
                <div class="col-12 mt-5">
                    <router-link to="/slider/slides">
                        <v-btn depressed small color="white">
                            Slides
                        </v-btn>
                    </router-link>
                    <router-link to="/slider/display-settings" class="ml-3">
                        <v-btn depressed small color="light-blue darken-4" class="white--text">
                            Display settings
                        </v-btn>
                    </router-link>
                </div>

                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <p>Controlling the display order of slides in the Slider on the Main page. <br>
                        Here is the list of active slides in the slider and offers that should be displayed in the slider.</p>
                </div>

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.create_at>
                            {{ 1 }}
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
    private TableHeaders: TableHeaderItemType[] = DataSlider.SliderDisplayTableHeaders;
    private TableItems: IAdminPanelCompanyList[] | undefined = [];


    private async GetSlider(): Promise<void> {
        try {
            const slidesList = await ApiSlider.GetSlider(ApiEnter.CurrentSessionUUID as string);
            if(slidesList) this.TableItems = slidesList.filter(i => i.publish === 1)
        } catch (e) {
            console.error(e);
        }
    }

    public created(): void {
        this.GetSlider()
    }
}
</script>
