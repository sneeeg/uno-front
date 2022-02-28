<template>
    <div class="component-container page-header-component">
        <div class="col-12 mb-2 pb-2 clearfix">
            <h6 class="float-left">{{ title }}</h6>
            <div class="tool-items float-left ml-5 text-right">
                <!--<router-link :to="BackUrl" v-if="BackUrl && BackUrl.length > 0">
                    <v-btn tile text color="indigo">
                        <v-icon left>
                            fas fa-arrow-left
                        </v-icon>
                        <span class="tool-text d-inline-block">
                            Вернуться назад
                        </span>
                    </v-btn>
                </router-link>-->
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
    watch: {
        "title": "OnTitleChanged"
    }
})
export default class PageHeader extends Vue {
    @Prop() public title!: string;
    @Prop({ default: "" }) public BackUrl!: string;

    private created(): void {
        this.OnTitleChanged();
    }

    private OnTitleChanged(): void {
        document.title = this.title;
    }
}
</script>
