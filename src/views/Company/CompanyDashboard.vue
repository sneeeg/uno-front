<template>
    <div class="page-container company-dashboard-page">
        <standart-template>
            <div class="well">
                <div class="well-wrapper">...</div>
            </div>
        </standart-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";
import PageHeader from "@/components/UI/PageHeader.vue";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";

@Component({
    components: { StandartTemplate, PageHeader }
})
export default class CompanyDashboard extends Vue {
    @Getter("getCurrentCompanyItem") private GetCurrentCompanyItem!: CompanyTableRowType | undefined;
    @Action("doSetCurrentCompanyItem") private DoSetCurrentCompanyItem!: (company_uuid: string | undefined) => Promise<void>;

    private created() {
        if (this.GetCurrentCompanyItem == undefined) {
            this.$router.push("/company/list");
        } else {
            this.DoSetCurrentCompanyItem(this.GetCurrentCompanyItem.uuid)
            this.$router.push("/company/edit/" + this.GetCurrentCompanyItem.uuid);
        }
    }
}
</script>
