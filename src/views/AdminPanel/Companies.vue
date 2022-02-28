<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Администрование компаний" back-url="/"/>

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" :items="TableItems" :items-per-page="15" item-key="name" class="elevation-1">
                        <template v-slot:item.action="{item }">
                            <v-btn icon @click="EditCompany(item.company_uuid)">
                                <v-icon>
                                    fas fa-edit
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
import DataCompany from "@/data/AdminPanel/DataCompany";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import ApiAdmin from "@/api/ApiAdmin";
import ApiEnter from "@/api/ApiEnter";
import IAdminPanelCompanyList from "@/struct/admin-panel/IAdminPanelCompanyList";

@Component({
    components: { StandartTemplate, PageHeader }
})
export default class Users extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataCompany.Breadcrumbs;

    private TableHeaders: TableHeaderItemType[] = DataCompany.TableHeaders;

    private TableItems: IAdminPanelCompanyList[] | undefined = [];

    private async GetCompanies(): Promise<void> {
        try {
            this.TableItems = await ApiAdmin.GetCompanies(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private EditCompany(company_uuid: string): void {
        this.$router.push(`/admin/edit-company/${company_uuid}`)
    }

    private created() {
        this.GetCompanies()
    }
}
</script>
