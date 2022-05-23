<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Email Notifications" back-url="/company/list/"/>
                <div class="col-12 px-6">
                    <v-divider></v-divider>
                </div>
                <h6 class="px-6 font-weight-bold text-uppercase">Edit</h6>
                <div class="col-12">
                    <div class="well mb-0">
                        <div class="well-wrapper">
                            <div class="row">
                                <div class="col-12">
                                    <div class="d-flex mt-6">
                                        <p class="font-weight-medium">Updated</p>
                                        <p class="ml-10 mb-0">{{ EmailNotification.update }}</p>
                                    </div>
                                    <div class="d-flex mt-6">
                                        <p class="font-weight-medium">TemplateID</p>
                                        <p class="ml-10 mb-0">{{ EmailNotification.template_id }}</p>
                                    </div>
                                    <v-switch
                                        v-model="EmailNotification.publish"
                                        label="Publish"
                                        inset
                                        hide-details
                                        class="mt-9 col-2"
                                    ></v-switch>
                                    <v-text-field
                                        label="Template name *"
                                        v-model="EmailNotification.template_name"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Topic name *"
                                        v-model="EmailNotification.topic_name"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-text-field
                                        label="Send TO *"
                                        v-model="EmailNotification.send_to"
                                        hide-details
                                        class="col-7 px-0 mt-5"
                                    ></v-text-field>
                                    <v-col>
                                        <v-row class="mt-5">
                                            <v-col cols="4">
                                                <p class="mb-1 text-body-2">HTML file of E-mail template</p>
                                                <span>The file must be in HTML format</span>
                                                <v-file-input
                                                    v-model="EmailNotification.file"
                                                    show-size
                                                    accept=".html"
                                                    label="Upload file"
                                                    hide-details
                                                    class="mt-3"
                                                ></v-file-input>
                                                <button
                                                    @click="DownloadFile1"
                                                    class="mt-3 pa-2"
                                                    :disabled="EmailNotification.file_name === ''"
                                                >
                                                    Download file
                                                </button>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </div>
                                <div class="col-12">
                                    <v-divider></v-divider>
                                </div>
                                <div class="col-12">
                                    <p class="font-weight-bold">The available variables</p>
                                    <ul class="pl-4 mt-2">
                                        <li><span>{{</span>name<span>}} - customer Name</span></li>
                                        <li><span>{{</span>email<span>}} - customer Email</span></li>
                                        <li><span>{{</span>order_number<span>}} - order number</span></li>
                                        <li><span>{{</span>order_status<span>}} - current order status</span></li>
                                        <li><span>{{</span>payment_status<span>}} - current order status</span></li>
                                        <li><span>{{</span>payment_amount<span>}} - total sum</span></li>
                                        <li><span>{{</span>tracking_number<span>}} - tracking number</span></li>
                                    </ul>

                                    <ul class="pl-4">
                                        <li><span>{{</span>shipping_address<span>}} - delivery address</span></li>
                                        <li><span>{{</span>billing_address<span>}} - residence address</span></li>
                                        <li><span>{{</span>payment_method<span>}} - payment method</span></li>
                                        <li><span>{{</span>order_items<span>}} - a complete list of order items and their prices</span></li>
                                        <li><span>{{</span>order_cards<span>}} - list of physical goods in the order that are sent to the address of the customer</span></li>
                                        <li><span>{{</span>tracking_link<span>}} - link to check delivery tracking</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 px-6">
                            <div class="col-12 py-6 bg-light">
                                <router-link to="/settings/email-notifications">
                                    <v-btn
                                        color="grey lighten-1"
                                        class="white--text col-1 ml-2"
                                        small
                                        depressed>
                                        Cancel
                                    </v-btn>
                                </router-link>
                                <v-btn
                                    color="orange accent-4"
                                    class="white--text col-1 ml-4"
                                    small
                                    @click="OnClickSubmit()"
                                    :disabled="EmailNotification.template_name === '' || EmailNotification.topic_name === '' ||  EmailNotification.send_to === ''"
                                    depressed>
                                    Save
                                </v-btn>
                            </div>
                        </div>
                    </div>
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
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import Editor from '@tinymce/tinymce-vue'
import dayjs from "dayjs";
import ApiAdmin from "@/api/ApiAdmin";
import ApiSettings from "@/api/ApiSettings";
import DataEmailNotifications from "@/data/AdminPanel/DataEmailNotifications";


@Component({
    components: { PageHeader, StandartTemplate, Editor },
})

export default class EmailNotificationsEdit extends Vue {
    public Breadcrumbs: BreadcrumbsItemType[] = DataEmailNotifications.BreadcrumbsEdit;

    private CurrentUUID!: string;
    private EmailNotification: any = {
        publish: true,
        template_id: '',
        template_name: '',
        topic_name: '',
        send_to: '',
        file: null,
        file_name: '',
        update: '',
    }

    private async DoLoadForm(): Promise<void> {

        const emailNotificationInfo: any = await ApiSettings.GetEmailNotificationByUUID(ApiEnter.CurrentSessionUUID as string, this.CurrentUUID);
        if (emailNotificationInfo == undefined) {
            sweetalert({
                title: "Oop!",
                text: "Request error, not all data was loaded!",
                icon: "error"
            }).then(() => {
                this.$router.go(-1);
            });
            return;
        }

        this.EmailNotification.publish = emailNotificationInfo.publish
        this.EmailNotification.template_id = emailNotificationInfo.template_id
        this.EmailNotification.template_name = emailNotificationInfo.template_name
        this.EmailNotification.topic_name = emailNotificationInfo.topic_name
        this.EmailNotification.send_to = emailNotificationInfo.send_to
        this.EmailNotification.update = dayjs(emailNotificationInfo.update).format('DD.MM.YYYY HH:mm')
        this.EmailNotification.file = emailNotificationInfo.file ? ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, emailNotificationInfo.file)
            .then((response) => {
                this.EmailNotification.file = new File([new Blob([response.data])], emailNotificationInfo.file.split('/')[8])
            }) : null
        this.EmailNotification.file_name = emailNotificationInfo.file

        this.$forceUpdate();
    }

    private async DownloadFile1(): Promise<void> {
        await ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, this.EmailNotification.file_name).then((response) => {
            let a = document.createElement("a")
            let file = new Blob([response])
            a.href = URL.createObjectURL(file);
            a.download = this.EmailNotification.file_name.split('/')[8];
            a.click();
        })
    }

    private async OnClickSubmit(): Promise<void> {
        try {
            const response = await ApiSettings.UpdateEmailNotification(
                this.EmailNotification.template_name,
                this.EmailNotification.topic_name,
                this.EmailNotification.send_to,
                this.EmailNotification.file != null? await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID as string, this.EmailNotification.file) as string : '',
                this.EmailNotification.publish,
                ApiEnter.CurrentSessionUUID as string,
                this.CurrentUUID);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "Email notification has updated",
                    icon: "success"
                }).then(() => {
                    this.$router.go(-1);
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

    public mounted() {
        this.CurrentUUID = this.$route.params.email_uuid;
        this.DoLoadForm();
    }
}
</script>
