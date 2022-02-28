<template>
    <div class="page-container home-page">
        <standart-template>
            <div class="container">
                <div class="row mt-1">
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"></v-breadcrumbs>
                    <page-header title="Разделы"></page-header>
                    <div class="col-4 mt-4">
                        <router-link to="/company/list" class="card-control company-item">
                            <div class="icon">
                                <i class="fas fa-city"></i>
                            </div>
                            <div class="name">Список компаний</div>
                        </router-link>
                    </div>
                    <div class="col-4 mt-4">
                        <router-link to="/profile/edit" class="card-control company-item" data-disabled="">
                            <div class="icon">
                                <i class="fas fa-user-cog"></i>
                            </div>
                            <div class="name">Управление Профилем</div>
                            <div class="disabled-text">Раздел пока-что разрабатывается</div>
                        </router-link>
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
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import PageHeader from "@/components/UI/PageHeader.vue";

@Component({
    components: { PageHeader, StandartTemplate },
    watch: {
        "GetCurrentCompanyItem": "OnGetCurrentCompanyItemChanged"
    }
})
export default class Home extends Vue {
    @Getter("getCurrentCompanyList") private GetCurrentCompanyList!: CompanyTableRowType[] | undefined;
    @Getter("getCurrentCompanyItem") private GetCurrentCompanyItem!: CompanyTableRowType | undefined;

    private Breadcrumbs!: BreadcrumbsItemType[];

    private created(): void {
        if (this.GetCurrentCompanyList?.length == 0) {
            this.$router.push("/company/create");
        } else {
            if (this.GetCurrentCompanyItem == undefined) {
                this.$router.push("/company/list");
            } else {
                this.$router.push("/company/edit/" + this.GetCurrentCompanyItem.uuid);
            }
        }

        this.Breadcrumbs = [
            {
                disabled: true,
                to: "/",
                text: "Главная"
            }
        ];
        this.OnGetCurrentCompanyItemChanged();
    }

    private OnGetCurrentCompanyItemChanged(): void {
//
    }

    private mounted(): void {
        document.title = "Главная страница";
    }
}
</script>
