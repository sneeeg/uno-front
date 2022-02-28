import Vue from "vue";
import Vuex from "vuex";
import TenantStore from "@/store/modules/common/tenant/TenantStore";
import CurrentUserSessionStore from "@/store/modules/common/current-user-session/CurrentUserSessionStore";
import CompanyStore from "@/store/modules/common/company/CompanyStore";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        TenantStore,
        CurrentUserSessionStore,
        CompanyStore
    }
});
