<template>
    <v-app>
        <!--<language-switcher></language-switcher>-->
        <pre-loading v-if="HaveCurrentTenant == false"></pre-loading>
        <router-view v-else/>
    </v-app>
</template>
<script lang="ts">
import { Getter } from "vuex-class";

import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
import PersonalUserItemType from "@/struct/user/PersonalUserItemType";
import PreLoading from "@/components/PreLoading.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

import "bootstrap/dist/js/bootstrap.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

import "@/assets/style/index.less";

@Component({
    components: { LanguageSwitcher, PreLoading },
    watch: {
        "$route": "OnChangeRoute",
        "GetCurrentSessionUser": "OnChangeCurrentSessionState"
    }
})
export default class App extends Vue {
    @Getter("haveCurrentTenant") private HaveCurrentTenant!: boolean;
    @Getter("haveCurrentSession") private HaveCurrentSession!: boolean;
    @Getter("getCurrentSessionUser") private GetCurrentSessionUser!: PersonalUserItemType | undefined;


    private created(): void {
        this.OnChangeRoute(this.$route);
    }

    private OnChangeRoute(to: Route) {
        if (this.HaveCurrentTenant == false) {
            return;
        }
        if (this.HaveCurrentSession == false && (to == undefined || to.path.startsWith("/enter/") == false)) {
            this.$router.push("/enter/login");
        } else if (this.HaveCurrentSession == true && ((to != undefined && to.path.startsWith("/enter/login")) || location.href.startsWith("/enter/login"))) {
            this.$router.push("/");
        }
    }

    private OnChangeCurrentSessionState() {
        if (this.HaveCurrentTenant == false) {
            return;
        }
        if (this.HaveCurrentSession == false && (this.$route.path.startsWith("/enter/") == false)) {
            this.$router.push("/enter/login");
        } else if (this.HaveCurrentSession == true && (this.$route.path.startsWith("/enter/") == true)) {
            this.$router.push("/");
        }
    }
}
</script>
