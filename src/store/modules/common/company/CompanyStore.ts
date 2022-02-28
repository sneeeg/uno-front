import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import CompanyStoreType from "@/store/modules/common/company/CompanyStoreType";
import StoreRootType from "@/store/StoreRootType";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";
import ApiCompany from "@/api/ApiCompany";
import ApiEnter from "@/api/ApiEnter";

const state: CompanyStoreType = {
    CurrentCompanyItem: undefined,
    CurrentCompanyList: undefined
};
const getters: GetterTree<CompanyStoreType, StoreRootType> = {
    getCurrentCompanyItem(state: CompanyStoreType): CompanyTableRowType | null | undefined {
        return state.CurrentCompanyItem;
    },
    getCurrentCompanyList(state: CompanyStoreType): CompanyTableRowType[] | undefined {
        return state.CurrentCompanyList;
    },
    haveCurrentCompanyItem(state: CompanyStoreType): boolean {
        return state.CurrentCompanyItem != undefined;
    },
    haveCurrentCompanyList(state: CompanyStoreType): boolean {
        return state.CurrentCompanyList != undefined;
    }
};
const mutations: MutationTree<CompanyStoreType> = {
    setCurrentCompanyItem(state: CompanyStoreType, payload: CompanyTableRowType | null): void {
        if (payload == null) {
            localStorage.removeItem("x-company-uuid");
        } else {
            localStorage.setItem("x-company-uuid", payload.uuid);
        }

        state.CurrentCompanyItem = payload;
    },
    setCurrentCompanyList(state: CompanyStoreType, payload: CompanyTableRowType[] | undefined): void {
        state.CurrentCompanyList = payload;
    }
};
const actions: ActionTree<CompanyStoreType, StoreRootType> = {
    async doUpdateCurrentCompanyItem(ctx: ActionContext<CompanyStoreType, StoreRootType>): Promise<void> {
        const company_uuid = localStorage.getItem("x-company-uuid");
        if (company_uuid != undefined) {
            ctx.dispatch("doSetCurrentCompanyItem", company_uuid);
        }
    },
    async doSetCurrentCompanyItem(ctx: ActionContext<CompanyStoreType, StoreRootType>, company_uuid: string): Promise<void> {
        console.log("doSetCurrentCompanyItem: " + company_uuid);

        if (ApiEnter.CurrentSessionUUID == undefined) {
            return;
        }

        ApiCompany.CurrentCompanyUUID = company_uuid;

        const company: CompanyTableRowType | null = await ApiCompany.GetCompanyItemFromSession(ApiEnter.CurrentSessionUUID, company_uuid);
        ctx.commit("setCurrentCompanyItem", company);
    },
    async doUpdateCurrentCompanyList(ctx: ActionContext<CompanyStoreType, StoreRootType>): Promise<void> {
        if (ApiEnter.CurrentSessionUUID == undefined) {
            return;
        }

        const companyList: CompanyTableRowType[] | undefined = await ApiCompany.GetCompanyListFromSession(ApiEnter.CurrentSessionUUID);
        ctx.commit("setCurrentCompanyList", companyList);
    }
};

export default {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
} as Module<CompanyStoreType, StoreRootType>;
