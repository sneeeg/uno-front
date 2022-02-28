<template>
    <div :class="'component-container input-enter-component input-enter-email-component form-row mb-3 mt-5 ' + (hasValueFocusStatus ? 'focused ' : '') + (privateValueField.length > 0 && !hasValueValidStatus ? 'tooltip-show ' : '')">
        <input-text-from-enter name="Email">
            <template v-slot:input>
                <input type="email" maxlength="128" autocomplete="off" autocapitalize="off" :readonly="readonly" aria-autocomplete="none" tabindex="0" v-model="privateValueField" @input="OnInputEvent" @focusout="OnFocusOut" @focusin="OnFocusIn" :class="{'form-control': true, 'is-valid': (hasValueValidStatus), 'is-invalid': (!hasValueValidStatus && privateValueField.length > 0)}">
            </template>
            <template v-slot:tooltip>
                <ul>
                    <li>Введите корректны Email адрес.</li>
                </ul>
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
export default class InputEnterEmail extends Vue {
    @Prop({ default: "" }) private value!: string;
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
        const newValidState = this.privateValueField.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null;
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
