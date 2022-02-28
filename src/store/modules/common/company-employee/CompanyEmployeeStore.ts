import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import StoreRootType from "@/store/StoreRootType";
import CompanyEmployeeStoreType from "@/store/modules/common/company-employee/CompanyEmployeeStoreType";

const state: CompanyEmployeeStoreType = {};
const getters: GetterTree<CompanyEmployeeStoreType, StoreRootType> = {};
const mutations: MutationTree<CompanyEmployeeStoreType> = {};
const actions: ActionTree<CompanyEmployeeStoreType, StoreRootType> = {};

export default {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
} as Module<CompanyEmployeeStoreType, StoreRootType>;
