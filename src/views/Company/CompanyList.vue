<template>
    <div class="page-container company-list-page">
        <standart-template>
            <div class="container">
                <div class="row mt-1">
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                    <page-header title="Список компаний" back-url="/">
                        <router-link to="/company/create">
                            <v-btn small tile color="success">
                                <v-icon left>
                                    fas fa-plus
                                </v-icon>
                                <span class="tool-text">
                                    Создать новую компанию
                                </span>
                            </v-btn>
                        </router-link>
                    </page-header>
                    <div class="col-12">
                        <v-data-table dense :headers="TableHeaders" :items="GetCurrentCompanyList" :items-per-page="15" item-key="name" class="elevation-1">
                            <template v-slot:item.name="{ item }">
                                <router-link :to="'/company/dashboard/' + item.uuid">
                                    {{ item.name }}
                                </router-link>
                            </template>
                            <template v-slot:item.status="{ item }">
                                <span :class="'badge bg-' + GetClassBadgeFromCompanyStatus(item)">{{ GetTextBadgeFromCompanyStatus(item) }}</span>
                            </template>
                        </v-data-table>
                    </div>
                </div>
            </div>
        </standart-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";
import ECompanyEnum from "@/struct/company/ECompanyEnum";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import PageHeader from "@/components/UI/PageHeader.vue";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import DataCompanyList from "@/data/Company/DataCompanyList";

@Component({
    components: { StandartTemplate, PageHeader}
})
export default class CompanyList extends Vue {
    @Getter("getCurrentCompanyList") private GetCurrentCompanyList!: CompanyTableRowType[] | undefined;

    private Breadcrumbs!: BreadcrumbsItemType[];
    private TableHeaders: TableHeaderItemType[] = DataCompanyList.TableHeaders;

    private created(): void {
        this.Breadcrumbs = [
            {
                to: "/",
                text: "Главная"
            },
            {
                disabled: true,
                to: "/company/list",
                text: "Компании"
            }
        ];
    }

    private mounted(): void {
        document.title = "Список компаний";
    }

    private GetTextBadgeFromCompanyStatus(company: CompanyTableRowType): string {
        switch (company.status) {
            case ECompanyEnum.CompanyStatus.Active:
                return "Активна";
            case ECompanyEnum.CompanyStatus.NoActive:
                return "НеАктивна";
            case ECompanyEnum.CompanyStatus.Banned:
                return "Заблокирована";
            case ECompanyEnum.CompanyStatus.Deleted:
                return "Удалена";
        }
        return "Не Известно";
    }

    private GetClassBadgeFromCompanyStatus(company: CompanyTableRowType): string {
        switch (company.status) {
            case ECompanyEnum.CompanyStatus.Active:
                return "success";
            case ECompanyEnum.CompanyStatus.NoActive:
                return "warning";
            case ECompanyEnum.CompanyStatus.Banned:
                return "danger";
            case ECompanyEnum.CompanyStatus.Deleted:
                return "info";
        }
        return "info";
    }

    private GetStatusName(status: ECompanyEnum.CompanyStatus): string {
        return ECompanyEnum.CompanyStatus[status];
    }
}
</script>
