<template>
    <div class="component-container left-menu-in-company-component">
        <slot></slot>
        <v-navigation-drawer>
            <v-list>
                <v-list-item v-for="item in LeftMenuItems" :key="'profile_left_menu_' + item.label" :class="{ 'active': (item.key == CurrentLeftMenuItem) }" @click="OnClickLeftMenuItem(item)" link>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.label }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import PersonalUserItemType from "@/struct/user/PersonalUserItemType";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";

@Component({
    components: {}
})
export default class Navbar extends Vue {
    @Getter("getCurrentSessionUser") private GetCurrentSessionUser!: PersonalUserItemType | undefined;
    @Getter("getCurrentCompanyList") private GetCurrentCompanyList!: CompanyTableRowType[] | undefined;
    @Getter("getCurrentCompanyItem") private GetCurrentCompanyItem!: CompanyTableRowType | undefined;
}
</script>
