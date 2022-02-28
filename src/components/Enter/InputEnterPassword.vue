<template>
    <div :class="'component-container input-enter-component input-enter-password-component form-row mb-3 ' + (hasValueFocusStatus ? 'focused ' : '') + (privateValueField.length > 0 && !hasValueValidStatus ? 'tooltip-show ' : '')">
        <input-text-from-enter :name="confirm ? 'Повторите пароль' : 'Пароль'">
            <template v-slot:input>
                <input type="password" :name="confirm ? 'pass2' : 'pass1'" :readonly="readonly" maxlength="32" autocomplete="off" autocapitalize="off" aria-autocomplete="none" tabindex="0" v-model="privateValueField" @input="OnInputEvent" @focusout="OnFocusOut" @focusin="OnFocusIn"
                       :class="{'form-control': true, 'is-valid': (hasValueValidStatus), 'is-invalid': (!hasValueValidStatus && privateValueField.length > 0)}">
            </template>
            <template v-slot:tooltip>
                <ul>
                    <li>Пароль должен быть от 6 до 32 символов.</li>
                </ul>
            </template>
            <template v-slot:name-link>
                <router-link to="/enter/forgot-password" tabindex="-1" v-if="forgod">Забыли пароль?</router-link>
            </template>
        </input-text-from-enter>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import InputTextFromEnter from "@/components/Template/Enter/InputTextFromEnter.vue";

@Component({
    components: { InputTextFromEnter }
})
export default class InputEnterPassword extends Vue {
    @Prop({ default: "" }) private value!: string;
    @Prop({ default: false }) private forgod!: boolean;
    @Prop({ default: false }) private confirm!: boolean;
    @Prop({ default: false }) private readonly !: boolean;

    private privateValueField!: string;
    private hasValueValidStatus!: boolean;
    private hasValueFocusStatus!: boolean;

    private created(): void {
        this.privateValueField = this.value;
        this.hasValueValidStatus = false;
        this.hasValueFocusStatus = false;
    }

    private OnFocusIn(): void {
        this.hasValueFocusStatus = true;
        this.$forceUpdate();
    }

    private OnFocusOut(): void {
        this.hasValueFocusStatus = false;
        this.$forceUpdate();
    }

    private OnInputEvent(): void {
        this.$emit("input", this.privateValueField);
        this.DoValidate();
    }

    private DoValidate(): void {
        let newValidState = (this.privateValueField.trim().length >= 6 && this.privateValueField.trim().length <= 32);
        if (newValidState == true && this.confirm) {
            newValidState = ((document.querySelector("input[name=\"pass1\"]") as HTMLInputElement).value == this.privateValueField);
        }
        if (newValidState != this.hasValueValidStatus) {
            this.$emit("valid", newValidState);
        }
        this.hasValueValidStatus = newValidState;
        this.ForceUpdate();
    }

    private ForceUpdate(): void {
        this.$forceUpdate();
        for (const childItem of this.$children) {
            childItem.$forceUpdate();
        }
    }
}
</script>
