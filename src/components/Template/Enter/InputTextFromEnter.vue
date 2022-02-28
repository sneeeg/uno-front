<template>
    <div class="template-container input-text-from-enter-template col">
        <span>
            {{ name }}
            <slot name="name-link"></slot>
        </span>
        <slot name="input"></slot>
        <div class="tooltip-wrapper">
            <div class="tooltip-container">
                <slot name="tooltip"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {}
})
export default class InputTextFromEnter extends Vue {
    @Prop() private name!: string;

    private created(): void {
        //
    }
}
</script>
