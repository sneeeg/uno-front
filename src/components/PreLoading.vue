<template>
    <div class="page-container pre-loading enter-template">
        <EnterTemplate title-text="Загрузка..." sub-title-text="Ожидайте, получение информации от сервера!">
            <template v-slot>
                <div class="enter-form wrapper-layer">
                    <div class="front-layer">
                        <h1 class="logo"> Uno<span>CRM</span></h1>
                        <h2> . . . </h2>
                    </div>
                </div>
            </template>
        </EnterTemplate>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import EnterTemplate from "@/components/Template/EnterTemplate.vue";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";

@Component({
    components: { EnterTemplate }
})
export default class PreLoading extends Vue {
    @Action("doUpdateCurrentTenant") private DoUpdateCurrentTenant!: () => Promise<void>;
    @Action("doUpdateCurrentUser") private DoUpdateCurrentUser!: () => Promise<void>;
    @Action("doUpdateCurrentCompanyItem") private DoUpdateCurrentCompanyItem!: () => Promise<void>;
    @Action("doUpdateCurrentCompanyList") private DoUpdateCurrentCompanyList!: () => Promise<void>;
    @Getter("haveCurrentSession") private HaveCurrentSession!: boolean;
    @Getter("getCurrentCompanyItem") private GetCurrentCompanyItem!: CompanyTableRowType | undefined;

    private async created(): Promise<void> {
        await this.DoUpdateCurrentUser();
        await this.DoUpdateCurrentCompanyList();
        await this.DoUpdateCurrentCompanyItem();
        await this.DoUpdateCurrentTenant();
        (this.$root.$children[0] as any).OnChangeRoute(this.$route);
    }
}
</script>
