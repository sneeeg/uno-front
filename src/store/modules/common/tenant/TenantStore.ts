import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import TenantStoreType from "@/store/modules/common/tenant/TenantStoreType";
import StoreRootType from "@/store/StoreRootType";
import TenantTableRowType from "@/struct/tenant/TenantTableRowType";

const state: TenantStoreType = {
    CurrentTenant: undefined
};
const getters: GetterTree<TenantStoreType, StoreRootType> = {
    getCurrentTenant(state: TenantStoreType): TenantTableRowType | null | undefined {
        return state.CurrentTenant;
    },
    haveCurrentTenant(state: TenantStoreType): boolean {
        return state.CurrentTenant !== undefined;
    }
};
const mutations: MutationTree<TenantStoreType> = {
    setCurrentTenant(state: TenantStoreType, payload: TenantTableRowType | null) {
        state.CurrentTenant = payload;
    }
};
const actions: ActionTree<TenantStoreType, StoreRootType> = {
    async doUpdateCurrentTenant(ctx: ActionContext<TenantStoreType, StoreRootType>) {
        ctx.commit("setCurrentTenant", null);
        return;
    }
};

export default {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
} as Module<TenantStoreType, StoreRootType>;
