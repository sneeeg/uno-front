<template>
    <div class="page-container registration-page">
        <enter-template title-text="Личный кабинет" sub-title-text="Ваш уневерсальный помошник и CRM система для Uno!">
            <template v-slot>
                <div class="enter-form wrapper-layer">
                    <div class="front-layer">
                        <h1 class="logo"> Uno<span>CRM</span></h1>
                        <h2> Регистрация в Личном Кабинете </h2>
                        <div :class="'mb-3 mt-5' + GetClass_FormRow(Form.Email)">
                            <input-text-from-enter name="Email">
                                <template v-slot:input>
                                    <input type="email" maxlength="128" autocomplete="off" autocapitalize="off" aria-autocomplete="none" tabindex="1" v-model="Form.Email.value" @input="OnInputChanged(Form.Email)" @change="OnInputChanged(Form.Email)" @focusout="OnInputFocusOut(Form.Email)" @focusin="OnInputFocusIn(Form.Email)"
                                           :class="GetClass_FormRowInput(Form.Email)">
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
                                    <input type="password" maxlength="32" autocomplete="off" autocapitalize="off" aria-autocomplete="none" tabindex="2" v-model="Form.Password.value" @input="OnInputChanged(Form.Password)" @change="OnInputChanged(Form.Password)" @focusout="OnInputFocusOut(Form.Password)" @focusin="OnInputFocusIn(Form.Password)"
                                           :class="GetClass_FormRowInput(Form.Password)">
                                </template>
                                <template v-slot:tooltip>
                                    <ul>
                                        <li>Пароль должен быть от 6 до 32 символов.</li>
                                    </ul>
                                </template>
                            </input-text-from-enter>
                        </div>
                        <div :class="'mb-3' + GetClass_FormRow(Form.Password2)">
                            <input-text-from-enter name="Повторите пароль">
                                <template v-slot:input>
                                    <input type="password" maxlength="32" autocomplete="off" autocapitalize="off" aria-autocomplete="none" tabindex="2" v-model="Form.Password2.value" @input="OnInputChanged(Form.Password2)" @change="OnInputChanged(Form.Password2)" @focusout="OnInputFocusOut(Form.Password2)" @focusin="OnInputFocusIn(Form.Password2)"
                                           :class="GetClass_FormRowInput(Form.Password2)">
                                </template>
                                <template v-slot:tooltip>
                                    <ul>
                                        <li>Пароль должен быть от 6 до 32 символов.</li>
                                        <li>Введеные пароли должны совпадать.</li>
                                    </ul>
                                </template>
                            </input-text-from-enter>
                        </div>
                        <div class="form-row mb-5">
                            <div class="col-xxl-7 col-xl-6 col-lg-12">

                            </div>
                            <div class="col-xxl-5 col-xl-6 col-lg-12"><input type="button" value="Зарегистрироваться" :disabled="HasValidForm == false || HasRegistrationRequest == true" @click="OnSubmit()" tabindex="3" class="btn btn-primary btn-block"></div>
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
import { AxiosError } from "axios";
import EnterTemplate from "@/components/Template/EnterTemplate.vue";
import InputTextFromEnter from "@/components/Template/Enter/InputTextFromEnter.vue";
import InputEnterEmail from "@/components/Enter/InputEnterEmail.vue";
import InputEnterPassword from "@/components/Enter/InputEnterPassword.vue";
import sweetalert from "sweetalert";
import FormInputModelType from "@/struct/form/FormInputModelType";
import { FormListInputModelType } from "@/struct/form/FormListInputModelType";
import ApiEnter from "@/api/ApiEnter";

@Component({
    components: { InputEnterPassword, InputEnterEmail, InputTextFromEnter, EnterTemplate }
})
export default class Registration extends Vue {

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
        },
        Password2: {
            value: "",
            empty: true,
            focused: false,
            valid: false
        }
    };
    private HasValidForm!: boolean;
    private HasRegistrationRequest!: boolean;

    private created(): void {
        document.title = "Регистрация";

        this.HasValidForm = false;
        this.HasRegistrationRequest = false;
    }

    private GetClass_FormRow(model: FormInputModelType): string {
        let result = " form-row";
        result += (model.focused ? " focused " : "");
        result += (!model.empty && !model.valid ? " tooltip-show " : "");
        return result;
    }

    private GetClass_FormRowInput(model: FormInputModelType): string {
        let result = " form-control";
        if (model.empty == false) {
            result += (model.valid ? " is-valid" : "");
            result += (!model.valid && !model.empty ? " is-invalid" : "");
        }
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
        } else if (model == this.Form.Password2) {
            newValidState = model.value == this.Form.Password.value;
        }

        if (newValidState != model.valid) {
            model.valid = newValidState;
            this.HasValidForm = (this.Form.Email.valid == true && this.Form.Password.valid == true && this.Form.Password2.valid == true);
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

        this.HasRegistrationRequest = true;
        this.SetInputValue(this.Form.Password, "");
        this.SetInputValue(this.Form.Password2, "");

        ApiEnter.Registration(email, password).then((user_uuid: string | undefined) => {
            sweetalert({
                title: "Успех!",
                text: `Вы успешно зарегистрированы и можете входить под email: ${email}`,
                icon: "success"
            }).then(() => {
                this.$router.push(`/enter/login/${email}?user_uuid=${user_uuid}`);
            });
        }).catch((err: AxiosError) => {
            if ("response" in err == false || (err?.response?.status || 599) >= 500) {
                sweetalert({
                    title: "Ошибка запроса!",
                    text: "Во время отправки запроса, произошла ошибка!",
                    icon: "error"
                });
            } else {
                let text = "Во время регистрации, сервер вернул ошибку: " + err?.response?.data?.response;
                sweetalert({
                    title: "Ошибка регистрации!",
                    text: text,
                    icon: "error"
                });
            }
        }).finally(() => {
            this.HasRegistrationRequest = false;
            this.$forceUpdate();
        });
    }
}
</script>
