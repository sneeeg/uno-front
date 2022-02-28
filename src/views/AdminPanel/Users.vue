<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/" />
                <page-header title="Администрование пользователей" back-url="/" />

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" :items="TableItems" :items-per-page="15" item-key="user" class="elevation-1">
                        <template v-slot:item.action="{item }">
                            <v-btn icon @click="EditUser(item.user_uuid)">
                                <v-icon>
                                    fas fa-edit
                                </v-icon>
                            </v-btn>
                            <v-btn icon @click="LoginOnUser(item.email)">
                                <v-icon>
                                    fas fa-sign-in-alt
                                </v-icon>
                            </v-btn>
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
import DataUser from "@/data/AdminPanel/DataUser";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import ApiAdmin from "@/api/ApiAdmin";
import ApiEnter from "@/api/ApiEnter";
import IAdminPanelUserList from "@/struct/admin-panel/IAdminPanelUserList";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";

@Component({
    components: { StandartTemplate, PageHeader }
})
export default class Users extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataUser.Breadcrumbs;

    private TableHeaders: TableHeaderItemType[] = DataUser.TableHeaders;

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
