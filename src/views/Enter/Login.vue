<template>
    <div class="page-container login-page">
        <enter-template title-text="Личный кабинет" sub-title-text="Ваш уневерсальный помошник и CRM система для Uno!">
            <template v-slot>
                <div class="enter-form wrapper-layer">
                    <div class="front-layer">
                        <h1 class="logo"> Uno<span>CRM</span></h1>
                        <h2> Вход в Личный Кабинет </h2>
                        <div :class="'mb-3 mt-5' + GetClass_FormRow(Form.Email)">
                            <input-text-from-enter name="Email">
                                <template v-slot:input>
                                    <input type="email" maxlength="128" autocomplete="off" autocapitalize="off" aria-autocomplete="none" tabindex="1" @keyup.enter="OnSubmit()" v-model="Form.Email.value" @input="OnInputChanged(Form.Email)" @change="OnInputChanged(Form.Email)" @focusout="OnInputFocusOut(Form.Email)" @focusin="OnInputFocusIn(Form.Email)" :class="GetClass_FormRowInput(Form.Email)">
                                </template>
                                <template v-slot:tooltip>
                                    <ul>
                                        <li>Введите корректны Email адрес.</li>
                                    </ul>
                                </template>
                            </input-text-from-enter>
                        </div>
                        <div :class="'mb-3' + GetClass_FormRow(Form.Password)">
                            <input-text-from-enter name="Пароль">
                                <template v-slot:input>
                                    <input type="password" maxlength="32" autocomplete="off" autocapitalize="off" aria-autocomplete="none" tabindex="2" @keyup.enter="OnSubmit()" v-model="Form.Password.value" @input="OnInputChanged(Form.Password)" @change="OnInputChanged(Form.Password)" @focusout="OnInputFocusOut(Form.Password)" @focusin="OnInputFocusIn(Form.Password)"
                                           :class="GetClass_FormRowInput(Form.Password)">
                                </template>
                                <template v-slot:tooltip>
                                    <ul>
                                        <li>Пароль должен быть от 6 до 32 символов.</li>
                                    </ul>
                                </template>
                                <template v-slot:name-link>
                                    <router-link to="/enter/forgot-password" tabindex="-1">Забыли пароль?</router-link>
                                </template>
                            </input-text-from-enter>
                        </div>
                        <div class="form-row mb-5">
                            <div class="col-xxl-7 col-xl-6 col-lg-12 mb-3 mt-2">
                                <label class="custom-control custom-checkbox m-0">
                                    <input type="checkbox" name="remember" tabindex="-1" checked disabled class="custom-control-input">
                                    <span class="custom-control-label">Запомнить меня</span>
                                </label>
                            </div>
                            <div class="col-xxl-5 col-xl-6 col-lg-12">
                                <input type="button" value="Войти" tabindex="3" :disabled="!HasValidForm || HasLoginRequest" @click="OnSubmit()" class="btn btn-primary btn-block">
                            </div>
                        </div>
                        <div class="text-center text-muted"> У вас нет личного кабинета?
                            <router-link to="/enter/registration/" class="" tabindex="4">Зарегистрируйтесь</router-link>
                        </div>
                    </div>
                </div>
            </template>
        </enter-template>
    </div>
</template>

<script lang="ts">
import sweetalert from "sweetalert";
import { AxiosError } from "axios";

import { Component, Vue } from "vue-property-decorator";
import EnterTemplate from "@/components/Template/EnterTemplate.vue";
import InputTextFromEnter from "@/components/Template/Enter/InputTextFromEnter.vue";
import InputEnterEmail from "@/components/Enter/InputEnterEmail.vue";
import InputEnterPassword from "@/components/Enter/InputEnterPassword.vue";
import ApiEnter from "@/api/ApiEnter";
import FormInputModelType from "@/struct/form/FormInputModelType";
import { FormListInputModelType } from "@/struct/form/FormListInputModelType";
import { Action, Mutation } from "vuex-class";

@Component({
    components: { InputEnterPassword, InputEnterEmail, InputTextFromEnter, EnterTemplate }
})
export default class Login extends Vue {
    private Form: FormListInputModelType = {
        Email: {
            value: "",
            empty: true,
            focused: false,
            valid: false
        },
        Password: {
            value: "",
            empty: true,
            focused: false,
            valid: false
        }
    };
    private HasValidForm!: boolean;
    private HasLoginRequest!: boolean;

    @Action("doUpdateCurrentSessionUUID") private DoUpdateCurrentSessionUUID!: (session_uuid: string | undefined) => Promise<void>;
    @Mutation("setCurrentTenant") private SetCurrentTenant!: (tenant: null | undefined) => void;

    private created(): void {
        this.HasValidForm = false;
        this.HasLoginRequest = false;

        if (this.$route.params?.email != undefined) {
            this.Form.Email.value = this.$route.params.email;
            this.OnInputChanged(this.Form.Email);
        }

        document.title = "Вход";
    }

    private GetClass_FormRow(model: FormInputModelType): string {
        let result = " form-row";
        result += (model.focused ? " focused " : "");
        result += (!model.empty && !model.valid ? " tooltip-show " : "");
        return result;
    }

    private GetClass_FormRowInput(model: FormInputModelType): string {
        let result = " form-control";
        result += (model.valid ? " is-valid" : "");
        result += (!model.valid && !model.empty ? " is-invalid" : "");
        return result;
    }

    private OnInputFocusIn(model: FormInputModelType): void {
        model.focused = true;
        this.$forceUpdate();
    }

    private OnInputFocusOut(model: FormInputModelType): void {
        model.focused = false;
        this.$forceUpdate();
    }

    private SetInputValue(model: FormInputModelType, line: string): void {
        model.value = line;
        this.OnInputChanged(model);
    }

    private OnInputChanged(model: FormInputModelType): void {
        let newValidState: boolean = false;

        model.empty = model.value.length == 0;

        if (model == this.Form.Email) {
            newValidState = model.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null;
        } else if (model == this.Form.Password) {
            newValidState = model.value.length >= 6 && model.value.length <= 32;
        }

        if (newValidState != model.valid) {
            model.valid = newValidState;
            this.HasValidForm = (this.Form.Email.valid == true && this.Form.Password.valid == true);
        }

        this.$forceUpdate();
    }

    private OnSubmit(): void {
        if (this.HasValidForm == false) {
            sweetalert({
                title: "Ошибка в форме!",
                text: "Вы заполнили не все поля или есть ошибки!",
                icon: "error"
            });
            return;
        }

        const email = this.Form.Email.value;
        const password = this.Form.Password.value;

        this.SetInputValue(this.Form.Password, "");
        this.HasLoginRequest = true;
        this.$forceUpdate();

        ApiEnter.Login(email, password).then(async (session_uuid: string | undefined) => {
            await this.DoUpdateCurrentSessionUUID(session_uuid);
            this.SetCurrentTenant(undefined);
        }).catch((err: AxiosError) => {
            if ("response" in err == false || (err?.response?.status || 599) >= 500) {
                sweetalert({
                    title: "Ошибка запроса!",
                    text: "Во время отправки запроса, произошла ошибка!",
                    icon: "error"
                });
            } else {
                sweetalert({
                    title: "Ошибка авторизации!",
                    text: "Введенные вами данные не верны, проверьте введеные данные!",
                    icon: "error"
                });
            }
        }).finally(() => {
            this.HasLoginRequest = false;
            this.$forceUpdate();
        });
    }
}
</script>
