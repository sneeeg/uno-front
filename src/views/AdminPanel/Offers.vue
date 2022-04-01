<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Offers" back-url="/"/>

                <div class="col-12 mt-5">
                    <router-link to="/admin/catalog/offers">
                        <v-btn depressed small color="light-blue darken-4" class="white--text">
                            Offers
                        </v-btn>
                    </router-link>
                    <router-link to="/admin/catalog/categories" class="ml-3">
                        <v-btn depressed small color="white">
                            Categories
                        </v-btn>
                    </router-link>
                </div>
                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <router-link to="/admin/catalog/offers/create">
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed>
                            Add offer
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
import PageHeader from "@/components/UI/PageHeader.vue";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import ApiAdmin from "@/api/ApiAdmin";
import ApiEnter from "@/api/ApiEnter";
import IAdminPanelUserList from "@/struct/admin-panel/IAdminPanelUserList";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import DataOffers from "@/data/AdminPanel/DataOffers";

@Component({
    components: { StandartTemplate, PageHeader }
})
export default class Offers extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataOffers.Breadcrumbs;

    private TableHeaders: TableHeaderItemType[] = DataOffers.TableHeaders;

    private TableItems: IAdminPanelUserList[] | undefined = [];

    private async getUsers(): Promise<void> {
        try {
            this.TableItems = await ApiAdmin.GetUsers(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private EditUser(uuid: string): void {
        this.$router.push(`/admin/edit-user/${uuid}`);
    }

    private async LoginOnUser(email: string): Promise<void> {
        const session_uuid = await ApiAdmin.LoginOnUser(ApiEnter.CurrentSessionUUID as string, email);
        if (session_uuid !== undefined) {
            localStorage.setItem("XSessionUUIDOLD", ApiEnter.CurrentSessionUUID as string);
            localStorage.setItem("XSessionUUID", session_uuid);
            window.location.reload();
        }
    }


    private mounted() {
        this.getUsers();
    }

}
</script>
