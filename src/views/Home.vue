<template>
    <div class="page-container home-page">
        <standart-template>
            <div class="container">
                <div class="row mt-1">
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"></v-breadcrumbs>
                    <v-row class="mt-15">
                        <h6 class="font-weight-bold">CMS</h6>
                        <v-row class="mt-4">
                            <v-col>
                                <router-link to="/faq" class="card-control company-item">
                                    <div class="name">Support (FAQ)</div>
                                </router-link>
                            </v-col>
                            <v-col>
                                <router-link to="/cms/files" class="card-control company-item">
                                    <div class="name">Support (Files)</div>
                                </router-link>
                            </v-col>
                            <v-col>
                                <router-link to="/admin/blog" class="card-control company-item">
                                    <div class="name">Blog</div>
                                </router-link>
                            </v-col>
                            <v-col>
                                <router-link to="/slider/slides" class="card-control company-item">
                                    <div class="name">Slider</div>
                                </router-link>
                            </v-col>
                            <v-col>
                                <router-link to="/cms/source-files" class="card-control company-item">
                                    <div class="name">Source files for content</div>
                                </router-link>
                            </v-col>
                            <v-col>
                                <router-link to="/cms/feedback/contacts" class="card-control company-item">
                                    <div class="name">Feedback messages</div>
                                </router-link>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-divider></v-divider></v-col>
                        </v-row>
                        <h6 class="font-weight-bold">E-SHOP</h6>
                        <v-row class="mt-4">
                            <v-col cols="2">
                                <router-link to="/shop/offers" class="card-control company-item">
                                    <div class="name">Offers</div>
                                </router-link>
                            </v-col>
                            <v-col cols="2">
                                <router-link to="/shop/options" class="card-control company-item">
                                    <div class="name">Options and Extras</div>
                                </router-link>
                            </v-col>
                            <v-col cols="2">
                                <router-link to="/shop/orders" class="card-control company-item">
                                    <div class="name">Order management</div>
                                </router-link>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-divider></v-divider></v-col>
                        </v-row>
                        <h6 class="font-weight-bold">SETTINGS</h6>
                        <v-row class="mt-4">
                            <v-col cols="2">
                                <router-link to="/admin/users" class="card-control company-item">
                                    <div class="name">User management</div>
                                </router-link>
                            </v-col>
                            <v-col cols="2">
                                <router-link to="/settings/email-notifications" class="card-control company-item">
                                    <div class="name">Email Notifications</div>
                                </router-link>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-divider></v-divider></v-col>
                        </v-row>
                    </v-row>
                </div>
            </div>
        </standart-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import PageHeader from "@/components/UI/PageHeader.vue";

@Component({
    components: { PageHeader, StandartTemplate },
    watch: {
        "GetCurrentCompanyItem": "OnGetCurrentCompanyItemChanged"
    }
})
export default class Home extends Vue {
    @Getter("getCurrentCompanyList") private GetCurrentCompanyList!: CompanyTableRowType[] | undefined;
    @Getter("getCurrentCompanyItem") private GetCurrentCompanyItem!: CompanyTableRowType | undefined;

    private Breadcrumbs!: BreadcrumbsItemType[];

    public created(): void {

        this.Breadcrumbs = [
            {
                disabled: true,
                to: "/",
                text: "Home"
            }
        ];
        this.OnGetCurrentCompanyItemChanged();
    }

    private OnGetCurrentCompanyItemChanged(): void {
//
    }

    public mounted(): void {
        document.title = "Home Page";
    }
}
</script>
