<template>
    <div class="page-container logout-page">
        <enter-template title-text="Личный кабинет" sub-title-text="Ваш уневерсальный помошник и CRM система для Uno!">
            <template v-slot>
                <div class="enter-form wrapper-layer">
                    <div class="front-layer">
                        <h1 class="logo"> Uno<span>CRM</span></h1>
                        <h2> Выход из Личного Кабинета </h2>
                    </div>
                </div>
            </template>
        </enter-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EnterTemplate from "@/components/Template/EnterTemplate.vue";
import InputTextFromEnter from "@/components/Template/Enter/InputTextFromEnter.vue";
import InputEnterEmail from "@/components/Enter/InputEnterEmail.vue";
import InputEnterPassword from "@/components/Enter/InputEnterPassword.vue";
import { Action } from "vuex-class";

@Component({
    components: { InputEnterPassword, InputEnterEmail, InputTextFromEnter, EnterTemplate }
})
export default class Logout extends Vue {
    @Action("doUpdateCurrentSessionUUID") private DoUpdateCurrentSessionUUID!: (session_uuid: string | undefined) => Promise<void>;


    private created(): void {
        document.title = "Выход";
        const IsUserLogin = localStorage.getItem("XSessionUUIDOLD")
        if (IsUserLogin) {
            this.DoUpdateCurrentSessionUUID(IsUserLogin);
            localStorage.removeItem("XSessionUUIDOLD")
        } else {
            this.DoUpdateCurrentSessionUUID(undefined);
        }

        this.$router.push("/enter/login");
    }
}
</script>
