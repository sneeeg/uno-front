<template>
    <div class="page-container forgot-password-page">
        <enter-template title-text="Личный кабинет" sub-title-text="Ваш уневерсальный помошник и CRM система для Uno!">
            <template v-slot>
                <div class="enter-form wrapper-layer">
                    <div class="front-layer">
                        <h1 class="logo"> Uno<span>CRM</span></h1>
                        <h2> Восстановление пароля </h2>
                        <div class="alert alert-warning mt-5 mb-5 text-center">
                            Данный функционал, временно недоступен!
                        </div>
                        <div class="text-center text-muted"> У вас есть Личный Кабинет?
                            <router-link to="/enter/login/" class="" tabindex="4">Войдите</router-link>
                        </div>
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
import sweetalert from "sweetalert";

@Component({
    components: { InputEnterPassword, InputEnterEmail, InputTextFromEnter, EnterTemplate }
})
export default class ForgotPassword extends Vue {
    private FormValues = {
        Email: "",
        Password: ""
    };

    private mounted(): void {
        document.title = "Восстановление пароля";

        sweetalert({
            title: "Упс!",
            text: "Данная функция, пока что недоступна! Обратитесь в поддержку!",
            icon: "warning"
        }).then(() => {
            this.$router.push("/enter/login/");
        });
    }
}
</script>
