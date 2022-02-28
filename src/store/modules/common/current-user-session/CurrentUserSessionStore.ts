import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import CurrentUserSessionStoreType from "@/store/modules/common/current-user-session/CurrentUserSessionStoreType";
import StoreRootType from "@/store/StoreRootType";
import PersonalUserItemType from "@/struct/user/PersonalUserItemType";
import ApiEnter from "@/api/ApiEnter";

const state: CurrentUserSessionStoreType = {
    CurrentSessionUUID: undefined,
    CurrentSessionUser: undefined,
};
const getters: GetterTree<CurrentUserSessionStoreType, StoreRootType> = {
    getCurrentSessionUUID(state: CurrentUserSessionStoreType): string | undefined {
        return state.CurrentSessionUUID;
    },
    getCurrentSessionUser(state: CurrentUserSessionStoreType): PersonalUserItemType | undefined {
        return state.CurrentSessionUser;
    },
    haveCurrentSession(state: CurrentUserSessionStoreType): boolean {
        return state.CurrentSessionUUID != undefined;
    },
};
const mutations: MutationTree<CurrentUserSessionStoreType> = {
    setCurrentSessionUUID(state: CurrentUserSessionStoreType, payload: string | undefined) {
        ApiEnter.CurrentSessionUUID = payload;
        state.CurrentSessionUUID = payload;
    },
    setCurrentSessionUser(state: CurrentUserSessionStoreType, payload: PersonalUserItemType | undefined) {
        state.CurrentSessionUser = payload;
    },
};
const actions: ActionTree<CurrentUserSessionStoreType, StoreRootType> = {
    async doUpdateCurrentUser(ctx: ActionContext<CurrentUserSessionStoreType, StoreRootType>) {
        let sessionUUID: string | undefined = ctx.state.CurrentSessionUUID;
        if (sessionUUID == undefined) {
            sessionUUID = localStorage.getItem("XSessionUUID") as string;
            if (sessionUUID == undefined) {
                return;
            }
            ctx.commit("setCurrentSessionUUID", sessionUUID);
        }

        try {
            const user = await ApiEnter.GetUserFromSession(sessionUUID as string);
            ctx.commit("setCurrentSessionUser", user);
        } catch (err) {
            ctx.commit("setCurrentSessionUser", undefined);
            ctx.commit("setCurrentSessionUUID", undefined);
        }
    },
    async doUpdateCurrentSessionUUID(ctx: ActionContext<CurrentUserSessionStoreType, StoreRootType>, payload: string | undefined) {
        if (payload == undefined) {
            const session_uuid = ctx.state.CurrentSessionUUID;
            if (session_uuid != undefined) {
                ApiEnter.Logout(session_uuid);
            }

            localStorage.removeItem("XSessionUUID");
            ctx.commit("setCurrentSessionUser", undefined);
            ctx.commit("setCurrentSessionUUID", undefined);
            return;
        }

        localStorage.setItem("XSessionUUID", payload);
        ctx.commit("setCurrentSessionUUID", payload);

        await ctx.dispatch("doUpdateCurrentUser");

        // Сбрасываем данные о Tenant - дабы запустился PreLoader который обновит всю инфу на фронте.
        ctx.commit("setCurrentTenant", undefined);
    },

    async DoUpdateAdminUserSissionUUID(ctx: ActionContext<CurrentUserSessionStoreType, StoreRootType>, payload: string | undefined) {
        if (payload == undefined) {
            const session_uuid = ctx.state.CurrentSessionUUID;
            if (session_uuid != undefined) {
                ApiEnter.Logout(session_uuid);
            }

            localStorage.removeItem("XSessionUUID");
            ctx.commit("setCurrentSessionUser", undefined);
            ctx.commit("setCurrentSessionUUID", undefined);
            return;
        }

        localStorage.setItem("XSessionUUID", payload);
        ctx.commit("setCurrentSessionUUID", payload);

        await ctx.dispatch("doUpdateCurrentUser");

        // Сбрасываем данные о Tenant - дабы запустился PreLoader который обновит всю инфу на фронте.
        ctx.commit("setCurrentTenant", undefined);
    },
};

export default {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
} as Module<CurrentUserSessionStoreType, StoreRootType>;
