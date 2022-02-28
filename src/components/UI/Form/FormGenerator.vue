<template>
    <div class="component-container form-generator-component">
        <v-form ref="current-form">
            <div class="row">
                <div class="col-12 col-header" v-if="Title && Title.length > 0">
                    <h6 class="border-bottom pb-1 generator-category">{{ Title }}</h6>
                </div>
                <div class="col-12 col-input" v-for="(key) in GetKeysFormModel" :key="'form_key_' + key">
                    <v-text-field v-if="FormModel[key].type == 'text'" :label="FormModel[key].name" :counter="FormModel[key].maxlength" :rules="FormModel[key].rules" :messages="FormModel[key].message" v-model="FormModel[key].value" @input="OnInputValueChanged(FormModel[key])" @change="OnInputValueChanged(FormModel[key])"></v-text-field>
                    <v-select v-if="FormModel[key].type == 'select'" :label="FormModel[key].name" :items="FormModel[key].select" :rules="FormModel[key].rules" :messages="FormModel[key].message" v-model="FormModel[key].value" item-text="label" item-value="value"/>
                    <v-switch v-if="FormModel[key].type == 'checkbox'" v-model="FormModel[key].value" inset :label="FormModel[key].name" :messages="FormModel[key].message"></v-switch>
                </div>
            </div>
        </v-form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import { FormGeneratorListInputModelType } from "@/struct/form/FormGenerator/FormGeneratorListInputModelType";
import VFormType from "@/struct/form/VFormType";
import FormGeneratorInputModelType from "@/struct/form/FormGenerator/FormGeneratorInputModelType";


@Component({
    components: {}
})
export default class FormGenerator extends Vue {
    @Prop({ default: undefined }) public Title!: string | undefined;
    @Prop() public FormModel!: FormGeneratorListInputModelType;

    @Ref("current-form") public CurrentForm!: VFormType;

    private get GetKeysFormModel(): string[] {
        return Object.keys(this.FormModel);
    }

    private OnInputValueChanged(inputItem: FormGeneratorInputModelType): void {
        this.$emit("change", inputItem);
    }

}
</script>
