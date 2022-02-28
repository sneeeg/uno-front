<template>
    <div class="template-container enter-template">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-8 col-lg-6 d-lg-flex d-none left-wrapper">
                    <div class="overlay-dark"></div>
                    <div class="front-layer">
                        <h1> {{ TitleText }} </h1>
                        <h2> {{ SubTitleText }} </h2>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 col-md-12 d-flex right-wrapper">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {}
})
export default class EnterTemplate extends Vue {

    @Prop({ default: "" }) TitleText!: string;
    @Prop({ default: "" }) SubTitleText!: string;

    private created(): void {
        //
    }
}
</script>
