<template>
    <standart-template>
        <div class="container">
            <v-dialog
                v-model="isOpenDialog"
                persistent
                max-width="500"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        <span>File</span>
                        <v-spacer></v-spacer>
                        <v-btn icon depressed @click="OpenDialog">
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div class="col-12 pt-0">
                            <v-switch
                                v-model="newFile.publish"
                                label="Publish"
                                class="mt-0"
                                hide-details
                            ></v-switch>
                        </div>
                        <div class="col-12">
                            <v-file-input
                                show-size
                                label="Upload file"
                                v-model="newFile.file"
                                hide-details
                            ></v-file-input>
                        </div>
                        <div class="col">
                            <v-text-field
                                label="Description"
                                v-model="newFile.description"
                                hide-details
                                dense
                                class="mt-2"
                            ></v-text-field>
                        </div>
                    </v-card-text>
                    <v-card-actions class="py-6">
                        <v-spacer></v-spacer>
                        <v-btn
                            color="grey lighten-1"
                            class="white--text"
                            small
                            depressed
                            @click="OpenDialog"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed
                            :disabled="newFile.file == null"
                            @click="CreateSourceFile"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="isOpenEditDialog"
                persistent
                max-width="500"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        <span>File</span>
                        <v-spacer></v-spacer>
                        <v-btn icon depressed @click="OpenEditDialog">
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div class="col-12 d-flex">
                            <span class="font-weight-medium">Created</span>
                            <p class="ml-10 mb-0">{{ currentFile.created }}</p>
                        </div>
                        <div class="col-12 d-flex">
                            <span class="font-weight-medium">Updated</span>
                            <p class="ml-10 mb-0">{{ currentFile.update }}</p>
                        </div>
                        <div class="col-12 pt-0">
                            <v-switch
                                v-model="currentFile.publish"
                                label="Publish"
                                class="mt-0"
                                hide-details
                            ></v-switch>
                        </div>
                        <div class="col-12">
                            <v-file-input
                                show-size
                                label="Upload file"
                                v-model="newFile.file"
                                hide-details
                            ></v-file-input>
                            <button class="mt-4" @click="DownloadFile">
                                Download file
                            </button>
                        </div>
                        <div class="col">
                            <v-text-field
                                label="Description"
                                v-model="currentFile.description"
                                hide-details
                                dense
                                class="mt-4"
                            ></v-text-field>
                        </div>
                    </v-card-text>
                    <v-card-actions class="py-6">
                        <v-spacer></v-spacer>
                        <v-btn
                            color="grey lighten-1"
                            class="white--text"
                            small
                            depressed
                            @click="OpenEditDialog"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed
                            :disabled="newFile.file == null"
                            @click="ChangeFileInfo"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Source files for content" back-url="/"/>

                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <div class="col-12">
                    <v-btn
                        color="orange accent-4"
                        class="white--text"
                        small
                        @click="OpenDialog"
                        depressed>
                        Add file
                    </v-btn>
                </div>

                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" sort-by="priority" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.file_name="{ item }">
                            {{ item.file_name.split('/')[8] }}
                        </template>
                        <template v-slot:item.create_at="{ item }">
                            {{ formatDate(item.create_at) }}
                        </template>
                        <template v-slot:item.update="{ item }">
                            {{ formatDate(item.update) }}
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-switch hide-details v-model="item.publish" :input-value="item.publish" class="mt-0" @change="ChangeFilePublish(item)"></v-switch>
                                <v-btn icon @click="openEditDialog(item.uuid)">
                                    <v-icon small color="grey darken-2">
                                        fas fa-pencil-alt
                                    </v-icon>
                                </v-btn>
                                <v-btn icon @click="DeleteFile(item.uuid)">
                                    <v-icon small color="red darken-3">
                                        far fa-trash-alt
                                    </v-icon>
                                </v-btn>
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
import ApiSourceFiles from "@/api/ApiSourceFiles";
import ApiSupportFiles from "@/api/ApiSupportFiles";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import IAdminPanelCompanyList from "@/struct/admin-panel/IAdminPanelCompanyList";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import dayjs from "dayjs";
import DataSourceFiles from "@/data/CMS/DataSourceFiles";
import ApiAdmin from "@/api/ApiAdmin";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class SourceFiles extends Vue {

    public Breadcrumbs: BreadcrumbsItemType[] = DataSourceFiles.Breadcrumbs;
    private TableHeaders: TableHeaderItemType[] = DataSourceFiles.TableHeaders;
    private TableItems: IAdminPanelCompanyList[] | undefined = [];

    public isOpenDialog: boolean = false;
    private isOpenEditDialog: boolean = false;
    private newFile: any = {
        file: null,
        description: '',
        publish: true,
    }
    private currentFile: any = {
        file_name: '',
        description: '',
        publish: true,
        update: '',
        created: '',
        uuid: ''
    }

    private OpenDialog(): void {
        this.isOpenDialog = !this.isOpenDialog
        this.newFile.file = null
        this.newFile.description = ''
        this.newFile.publish = true
    }

    public OpenEditDialog(): void {
        this.isOpenEditDialog = !this.isOpenEditDialog
    }

    private async CreateSourceFile(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const file_uuid = await ApiSourceFiles.CreateFile(
                ApiEnter.CurrentSessionUUID,
                this.newFile.file != null? await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID as string, this.newFile.file) as string : '',
                this.newFile.description,
                this.newFile.publish? 1: 0);
            if (file_uuid == undefined || file_uuid.length != 36) {
                await sweetalert({
                    title: "Request error!",
                    text: "Creation error File: " + file_uuid,
                    icon: "info"
                });
                return;
            }
            this.$forceUpdate();

            sweetalert({
                title: "Success!",
                text: `File has created!`,
                icon: "success"
            }).then(() => this.OpenDialog())

            await this.GetFiles()
        }
    }

    private async ChangeFilePublish(item: any): Promise<void> {
        try {
            const response = await ApiSourceFiles.UpdateFilePublish(item.publish? 1: 0, ApiEnter.CurrentSessionUUID as string, item.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "File has updated"
                }).then(() => {
                    this.GetFiles()
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

    private async ChangeFileInfo(): Promise<void> {
        const file_name = this.newFile.file.name === this.currentFile.file_name.split('/')[8] ?
                this.currentFile.file_name :
                await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID as string, this.newFile.file) as string

        try {
            const response = await ApiSourceFiles.UpdateFileInfo(
                file_name,
                this.currentFile.description,
                this.currentFile.publish? 1: 0,
                ApiEnter.CurrentSessionUUID as string,
                this.currentFile.uuid);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Success!",
                    text: "File has updated"
                }).then(() => {
                    this.OpenEditDialog()
                    this.GetFiles()
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

    private async openEditDialog(uuid: string): Promise<void> {
        this.currentFile.uuid = uuid
        const fileInfo: any = await ApiSourceFiles.GetFileByUUID(ApiEnter.CurrentSessionUUID as string, uuid);
        if (fileInfo == undefined) {
            await sweetalert({
                title: "Opp!",
                text: "Error during request - not all data has loaded!",
                icon: "error"
            })
            return;
        }

        this.OpenEditDialog()

        this.currentFile.file_name = fileInfo.file_name
        this.currentFile.publish = fileInfo.publish
        this.currentFile.description = fileInfo.description
        this.currentFile.update = dayjs(fileInfo.update).format('DD.MM.YYYY HH:mm:s')
        this.currentFile.created = dayjs(fileInfo.create_at).format('DD.MM.YYYY HH:mm:s')
        this.currentFile.uuid = fileInfo.uuid

        ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, fileInfo.file_name)
            .then((response) => {
                this.newFile.file = new File([new Blob([response.data])], fileInfo.file_name.split('/')[8])
            })
    }

    private DeleteFile(uuid: string): void {
        sweetalert({
            title: "Are you sure?",
            text: "Do you really want to delete it?",
            icon: "warning",
            buttons: ["No, cancel", "Yes, I'm sure"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiSourceFiles.DeleteFile(ApiEnter.CurrentSessionUUID as string, uuid);
                if (typeof response == "boolean") {
                    await sweetalert({
                        title: "Success!",
                        text: "Files has deleted",
                        icon: "success"
                    });

                    await this.GetFiles()
                } else {
                    await sweetalert({
                        title: "Error!",
                        text: `Request error: ${response}`,
                        icon: "error"
                    });
                }
            }
        });
    }

    private async GetFiles(): Promise<void> {
        try {
            this.TableItems = await ApiSourceFiles.GetFiles(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private async DownloadFile(): Promise<void> {
        await ApiAdmin.GetFiles(ApiEnter.CurrentSessionUUID as string, this.currentFile.file_name).then((response) => {
            let a = document.createElement("a")
            let file = new Blob([response])
            a.href = URL.createObjectURL(file);
            a.download = this.currentFile.file_name.split('/')[8];
            a.click();
        })
    }

    private formatDate(item: string) {
        return dayjs(item).format('DD-MM-YYYY (HH:mm:s)')
    }

    public created(): void {
        this.GetFiles()
    }
}
</script>
