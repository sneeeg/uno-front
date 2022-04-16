<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Feedback - messages" back-url="/"/>

                <div class="col-12 mt-5">
                    <router-link to="/cms/feedback/contacts">
                        <v-btn depressed small color="white">
                            Contact us
                        </v-btn>
                    </router-link>
                    <router-link to="/cms/feedback/partners" class="ml-3">
                        <v-btn depressed small color="light-blue darken-4" class="white--text">
                            Become a Partner
                        </v-btn>
                    </router-link>
                </div>
                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <router-link :to="'/cms/files/edit/' + item.uuid">
                                    <v-btn icon>
                                        <v-icon small color="grey darken-2">
                                            fas fa-pencil-alt
                                        </v-icon>
                                    </v-btn>
                                </router-link>
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
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import DataFeedback from "@/data/CMS/DataFeedback";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class FeedbackPartners extends Vue {

    private Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/admin",
            text: "CMS"
        },
        {
            to: "/admin",
            text: "Feedback - messages"
        },
        {
            to: "/",
            text: "Become a Partner",
            disabled: true
        },
    ];

    private TableHeaders: TableHeaderItemType[] = DataFeedback.PartnersTableHeaders;
    private TableItems: any[] | undefined = [];

    private async GetFiles(): Promise<void> {
        try {
            this.TableItems = [];
        } catch (e) {
            console.error(e);
        }
    }

    public mounted(): void {
        this.GetFiles()
    }
}
</script>
