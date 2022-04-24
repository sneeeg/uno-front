<template>
    <div class="page-container">
        <standart-template>
            <div class="container">
                <div class="row mt-1">
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                    <page-header title="Order management" class="text-uppercase" back-url="/"/>
                </div>
                <v-expand-transition>
                    <v-col cols="12" v-show="isShowFilter" class="white mt-10 rounded-2 pb-10 px-5">
                        <v-row>
                            <v-col cols="5">
                                <v-select
                                    :items="['New', 'In progress', 'In delivery', 'Cancelled']"
                                    multiple
                                    chips
                                    hide-details
                                    label="Order status"
                                ></v-select>
                            </v-col>
                            <v-col cols="2" class="ml-4 pt-6">
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="date"
                                            label="Date from"
                                            prepend-icon="far fa-calendar"
                                            readonly
                                            hide-details
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date"
                                        no-title
                                        scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="menu = false"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.menu.save(date)"
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="2" class="ml-4 pt-6">
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="date"
                                            label="Date to"
                                            prepend-icon="far fa-calendar"
                                            hide-details
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date"
                                        no-title
                                        scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="menu = false"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.menu.save(date)"
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row class="mt-3">
                            <v-col cols="5">
                                <v-select
                                    :items="['Paid', 'Cancelled']"
                                    multiple
                                    chips
                                    hide-details
                                    label="Payment status"
                                ></v-select>
                            </v-col>
                            <v-col cols="2" class="ml-4 pt-6">
                                <v-text-field
                                    hide-details
                                    type="number"
                                    label="Total from"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2" class="ml-4 pt-6">
                                <v-text-field
                                    hide-details
                                    type="number"
                                    label="Total To"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-col class="pa-0 mt-10">
                            <v-btn
                                depressed
                                @click="isShowFilter = false"
                                class="green white--text darken-1 text-capitalize">
                                Apply filters
                            </v-btn>
                        </v-col>
                    </v-col>
                </v-expand-transition>
                <v-col cols="12" class="mt-8">
                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                                outlined
                                dense
                                hide-details
                                label="Search..."
                            >
                                <template v-slot:append>
                                    <v-icon small color="grey lighten-1">
                                        fas fa-search
                                    </v-icon>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col class="py-2">
                            <v-btn depressed
                                   large min-width="42"
                                   outlined
                                   class="fill-height rounded-2 pa-2 fill-height"
                                    @click="isShowFilter = !isShowFilter">
                                <v-icon small color="grey darken-1">
                                    fas fa-filter
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <div class="col-12">
                    <v-divider></v-divider>
                </div>
                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" :items="TableItems" sort-by="name" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.name="{ item }">
                            <div>
                                <router-link to="/shop/orders/view" class="orange--text text--darken-2 font-weight-bold">
                                    {{ item.name }}
                                </router-link>
                            </div>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </standart-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import DataOrder from "@/data/Shop/Order/DataOrder";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class Orders extends Vue {
    public Breadcrumbs: BreadcrumbsItemType[] = DataOrder.Breadcrumbs;
    private TableHeaders: TableHeaderItemType[] = DataOrder.TableHeaders;
    private TableItems: any[] | undefined = [
        {
            create_at: '24.04.2022 15:30',
            name: '#0235',
            customer: 'Antonio Parfenetti',
            mail: 'info@testmail.com',
            total: '95,50€',
            order_status: 'In process',
            payment_status: 'Paid'
        }
    ];

    date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu = false
    isShowFilter = false
}
</script>
