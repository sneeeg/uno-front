<template>
    <div class="left-tabs__tab">
        <div class="left-tabs__tab-icon">
            <v-icon
                :color="color"
            >
                {{ icon }}
            </v-icon>
        </div>

        <div class="left-tabs__tab-text">{{ label }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {}
})
export default class LeftMenuTab extends Vue{
    @Prop() public icon!: string;
    @Prop() public label!: string;
    @Prop() public color!: string;
}
</script>

<style scoped>

</style>
