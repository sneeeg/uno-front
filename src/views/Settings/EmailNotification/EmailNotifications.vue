<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Email Notifications" back-url="/"/>

                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <router-link to="/settings/email-notifications/create">
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed>
                            Add email notification
                        </v-btn>
                    </router-link>
                </div>

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" sort-by="priority" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.update="{ item }">
                            {{ formatDate(item.update) }}
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-switch hide-details inset v-model="item.publish" :input-value="item.publish" class="mt-0" @change="ChangePublish(item)"></v-switch>
                                <router-link :to="'/settings/email-notifications/edit/' + item.uuid">
                                    <v-btn icon>
                                        <v-icon small color="grey darken-2">
                                            fas fa-pencil-alt
                                        </v-icon>
                                    </v-btn>
                                </router-link>
                            </div>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>
    </standart-template>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import sweetalert from "sweetalert";
import ApiEnter from "@/api/ApiEnter";
import ApiSettings from "@/api/ApiSettings";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import IAdminPanelCompanyList from "@/struct/admin-panel/IAdminPanelCompanyList";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import dayjs from "dayjs";
import DataEmailNotifications from "@/data/AdminPanel/DataEmailNotifications";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class EmailNotifications extends Vue {

    public Breadcrumbs: BreadcrumbsItemType[] = DataEmailNotifications.Breadcrumbs;
    private TableHeaders: TableHeaderItemType[] = DataEmailNotifications.TableHeaders;
    private TableItems: IAdminPanelCompanyList[] | undefined = [];

    private async ChangePublish(item: any): Promise<void> {
        try {
            const response = await ApiSettings.UpdateEmailNotificationPublish(item.publish? 1: 0, ApiEnter.CurrentSessionUUID as string, item.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Email notification has updated"
                }).then(() => {
                    this.GetEmailNotifications()
                });
            } else {
                await sweetalert({
                    title: "Error!",
                    text: `Request error: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            await sweetalert({
                title: "Error!",
                text: "Request error!",
                icon: "error"
            });
        }
    }

    private async GetEmailNotifications(): Promise<void> {
        try {
            this.TableItems = await ApiSettings.GetEmailNotifications(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private formatDate(item: string) {
        return dayjs(item).format('DD.MM.YYYY HH:mm')
    }

    public created(): void {
        this.GetEmailNotifications()
    }
}
</script>
