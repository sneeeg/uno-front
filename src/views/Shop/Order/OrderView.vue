<template>
    <div class="page-container">
        <delivery-tracking :is-open="isOpenDeliveryTracking" @closeModal="isOpenDeliveryTracking = false"/>
        <note :is-open="isOpenNoteEdit" @closeModal="isOpenNoteEdit = false"/>
        <contact-information :is-open="isOpenContactInformation" @closeModal="isOpenContactInformation = false"/>
        <delivery-adress :is-open="isOpenDeliveryAddress" @closeModal="isOpenDeliveryAddress = false"/>
        <residential-address :is-open="isOpenResidentialAddress" @closeModal="isOpenResidentialAddress = false"/>
        <standart-template>
            <div class="container">
                <div class="row mt-1">
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                    <page-header title="Order management" back-url="/"/>
                </div>
                <div class="col-12">
                    <v-divider></v-divider>
                </div>
                <v-row>
                    <v-col cols="7">
                        <v-col>
                            <v-expansion-panels flat accordion multiple v-model="panels1">
                                <v-expansion-panel>
                                    <v-expansion-panel-header class="border-bottom">
                                        <h4>Order #000005</h4>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pt-5">
                                        <v-row>
                                            <v-col cols="4">
                                                <p class="font-weight-medium">Order created</p>
                                            </v-col>
                                            <v-col>
                                                <p>09.12.2021 15:30</p>
                                            </v-col>
                                        </v-row>
                                        <v-row class="d-flex align-center">
                                            <v-col cols="4">
                                                <p class="font-weight-medium">Order status</p>
                                            </v-col>
                                            <v-col cols="4">
                                                <v-select
                                                    :items="['New', 'In process', 'In delivery', 'Cancelled', 'Activated']"
                                                    height="20"
                                                    v-model="OrderStatus"
                                                    hide-details
                                                    label="Order status"
                                                >
                                                    <template v-slot:selection="{ item }">
                                                        <p class="text-body-2">{{ item }}</p>
                                                    </template>
                                                </v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <p class="font-weight-medium">Order amount</p>
                                            </v-col>
                                            <v-col>
                                                <p>177,98€</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <p class="font-weight-medium">Payment status</p>
                                            </v-col>
                                            <v-col>
                                                <v-chip
                                                color="green"
                                                label
                                                small
                                                text-color="white"
                                                class="font-weight-medium"
                                                >
                                                    Paid
                                                </v-chip>
                                            </v-col>
                                        </v-row>
                                        <v-row class="d-flex align-center">
                                            <v-col cols="4">
                                                <p class="font-weight-medium">Delivery tracking</p>
                                            </v-col>
                                            <v-col>
                                                <a href="#" target="_blank" class="link-button indigo--text text--darken-3">
                                                    22556644654
                                                    <v-icon small color="indigo darken-3">
                                                        mdi-open-in-new
                                                    </v-icon>
                                                </a>
                                                <v-btn
                                                    text
                                                    color="indigo darken-3"
                                                    height="auto"
                                                    class="text-capitalize text-body-2 ml-7 pa-2"
                                                    @click="isOpenDeliveryTracking = true"
                                                >
                                                        Edit
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel class="mt-8 rounded-3">
                                    <v-expansion-panel-header class="border-bottom">
                                        <h6>Products</h6>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pt-5">
                                        <v-row>
                                            <v-col>
                                                <p class="font-weight-bold">SIM #1</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" class="pb-0">
                                                <v-data-table
                                                    :headers="headersTableSim1"
                                                    :items="dataTableSim1"
                                                    :items-per-page="5"
                                                    hide-default-footer
                                                ></v-data-table>
                                                <v-divider class="my-2"></v-divider>
                                                <v-col class="d-flex justify-content-between pt-0">
                                                    <p class="font-weight-medium">Total for SIM #1</p>
                                                    <p class="font-weight-medium">127,99€</p>
                                                </v-col>
                                            </v-col>
                                        </v-row>
                                        <v-row><v-divider class="my-8"></v-divider></v-row>
                                        <v-row>
                                            <v-col>
                                                <p class="font-weight-bold">SIM #2</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" class="pb-0">
                                                <v-data-table
                                                    :headers="headersTableSim1"
                                                    :items="dataTableSim1"
                                                    :items-per-page="5"
                                                    hide-default-footer
                                                ></v-data-table>
                                                <v-divider class="my-2"></v-divider>
                                                <v-col class="d-flex justify-content-between pt-0">
                                                    <p class="font-weight-medium">Total for SIM #2</p>
                                                    <p class="font-weight-medium">127,99€</p>
                                                </v-col>
                                            </v-col>
                                        </v-row>
                                        <v-row><v-divider class="my-8"></v-divider></v-row>
                                        <v-row>
                                            <v-col cols="12">
                                                <p class="font-weight-bold">SIM #3</p>
                                            </v-col>
                                            <v-col class="d-flex justify-content-between pt-0">
                                                <p class="font-weight-medium">Replacement SIM</p>
                                                <p class="font-weight-medium">10,00€</p>
                                            </v-col>
                                        </v-row>
                                        <v-row><v-divider class="my-4"></v-divider></v-row>
                                        <v-row>
                                            <v-col class="d-flex justify-space-between pb-6">
                                                <p class="font-weight-bold text-uppercase">Total</p>
                                                <p class="font-weight-bold">180,98€</p>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel class="mt-8 rounded-3">
                                    <v-expansion-panel-header class="border-bottom">
                                        <h6>Portation information</h6>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pt-5">
                                        <v-row>
                                            <v-col>
                                                <p class="font-weight-bold">SIM #1</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Mobile number</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>393706541256</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Donor network</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Wind Tre S.p.A. / Very Mobile</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Donor SIM card number</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>32546854621547965418</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Type of services used in Donor</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Postpaid</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Flag Residual credit to transfer</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>YES</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col class="py-0">
                                                <v-divider></v-divider>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <p class="font-weight-bold">SIM #2</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col class="py-2">
                                                <p class="font-weight-medium">No porting</p>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel class="mt-8 rounded-3">
                                    <v-expansion-panel-header class="border-bottom">
                                        <h6>Payment information</h6>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pt-5">
                                        <v-row>
                                            <v-col cols="4">
                                                <p class="font-weight-medium">Payment date</p>
                                            </v-col>
                                            <v-col>
                                                <p>09.12.2021 15:30</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <p class="font-weight-medium">Payment method</p>
                                            </v-col>
                                            <v-col>
                                                <p>Mastercard ****1234</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <p class="font-weight-medium">Sum</p>
                                            </v-col>
                                            <v-col>
                                                <p>127,99€</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <p class="font-weight-medium">Payment status</p>
                                            </v-col>
                                            <v-col>
                                                <v-chip
                                                    color="green"
                                                    label
                                                    small
                                                    text-color="white"
                                                    class="font-weight-medium"
                                                >
                                                    Paid
                                                </v-chip>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-col>
                    </v-col>
                    <v-col cols="5">
                        <v-col>
                            <v-expansion-panels flat accordion multiple v-model="panels2">
                                <v-expansion-panel>
                                    <v-expansion-panel-header class="border-bottom">
                                        <v-row>
                                            <v-col class="d-flex align-center justify-space-between">
                                                <h6>Note</h6>
                                                <v-btn
                                                    text
                                                    color="indigo darken-3"
                                                    height="auto"
                                                    class="text-capitalize text-body-2 ml-7 pa-2"
                                                    @click.stop="isOpenNoteEdit = true">Edit</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pt-5">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel class="mt-8 rounded-3">
                                    <v-expansion-panel-header class="border-bottom">
                                        <h6>Customer information</h6>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pt-5">
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Firstname</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Massimo</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Lastname</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Pakhometti</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Fiscalcode</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>RSSMRA74D22A001Q</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Document type</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Driving license</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Document number</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>74D22A001Q</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Document issue date</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>21/05/2021</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" class="py-2">
                                                <p class="font-weight-medium">Language</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Italian</p>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel class="mt-8 rounded-3">
                                    <v-expansion-panel-header class="border-bottom">
                                        <v-row>
                                            <v-col class="d-flex align-center justify-space-between">
                                                <h6>Contact information</h6>
                                                <v-btn
                                                    text
                                                    color="indigo darken-3"
                                                    height="auto"
                                                    class="text-capitalize text-body-2 ml-7 pa-2"
                                                    @click.stop="isOpenContactInformation = true">Edit</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pt-5">
                                        <v-row>
                                            <v-col cols="4">
                                                <p class="font-weight-medium">E-mail</p>
                                            </v-col>
                                            <v-col>
                                                <a href="mailto:usermailname@domainname.com">usermailname@domainname.com</a>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <p class="font-weight-medium">Phone number</p>
                                            </v-col>
                                            <v-col>
                                                <a href="tel:393706542233">393706542233</a>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel class="mt-8 rounded-3">
                                    <v-expansion-panel-header class="border-bottom">
                                        <v-row>
                                            <v-col class="d-flex align-center justify-space-between">
                                                <h6>Delivery address</h6>
                                                <v-btn
                                                    text
                                                    color="indigo darken-3"
                                                    height="auto"
                                                    class="text-capitalize text-body-2 ml-7 pa-2"
                                                    @click.stop="isOpenDeliveryAddress = true">Edit</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pt-5">
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">Street Name</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Via Tommaso Salvini</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">Street Number</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>18</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">City</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Roma</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">Province</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>RM</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">ZIP code</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>00197</p>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel class="mt-8 rounded-3">
                                    <v-expansion-panel-header class="border-bottom">
                                        <v-row>
                                            <v-col class="d-flex align-center justify-space-between">
                                                <h6>Residential address</h6>
                                                <v-btn
                                                    text
                                                    color="indigo darken-3"
                                                    height="auto"
                                                    class="text-capitalize text-body-2 ml-7 pa-2"
                                                    @click.stop="isOpenResidentialAddress = true">Edit</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pt-5">
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">Street Name</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Via Tommaso Salvini</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">Street Number</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>18</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">City</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Roma</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">Province</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>RM</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">ZIP code</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>00197</p>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel class="mt-8 rounded-3">
                                    <v-expansion-panel-header class="border-bottom">
                                        <h6>Friend codes</h6>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pt-5">
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">SIM #1</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>SDFG234234</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">SIM #2</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>-</p>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel class="mt-8 rounded-3">
                                    <v-expansion-panel-header class="border-bottom">
                                        <h6>Marketing activities</h6>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="pt-5">
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">SIM #1</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Consent</p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" class="py-2">
                                                <p class="font-weight-medium">SIM #2</p>
                                            </v-col>
                                            <v-col class="py-2">
                                                <p>Not consent</p>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-col>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="px-6">
                        <v-expansion-panels flat accordion multiple v-model="panelsHistory">
                            <v-expansion-panel class="mt-8 rounded-3">
                                <v-expansion-panel-header class="border-bottom">
                                    <h6>Order history</h6>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="pt-5">
                                    <v-row>
                                        <v-col>
                                            <v-data-table
                                                :headers="headersTableOrderHistory"
                                                :items="dataTableOrderHistory"
                                                hide-default-footer
                                            ></v-data-table>
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                </v-row>
            </div>
        </standart-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import DataOrder from "@/data/Shop/Order/DataOrder";
import DeliveryTracking from "@/components/Modals/Order/DeliveryTracking.vue";
import Note from "@/components/Modals/Order/Note.vue";
import ContactInformation from "@/components/Modals/Order/ContactInformation.vue";
import DeliveryAdress from "@/components/Modals/Order/DeliveryAdress.vue";
import ResidentialAddress from "@/components/Modals/Order/ResidentialAddress.vue";


@Component({
    components: { ResidentialAddress, DeliveryAdress, ContactInformation, Note, DeliveryTracking, PageHeader, StandartTemplate, LeftMenuTab },
})

export default class OrderView extends Vue {
    public Breadcrumbs: BreadcrumbsItemType[] = DataOrder.Breadcrumbs;
    isOpenDeliveryTracking: boolean = false
    isOpenNoteEdit: boolean = false
    isOpenContactInformation: boolean = false
    isOpenDeliveryAddress: boolean = false
    isOpenResidentialAddress: boolean = false

    panels1 = [0, 1, 2, 3]
    panels2 = [0, 1, 2, 3, 4, 5, 6]
    panelsHistory = [0]
    OrderStatus = 'New'

    headersTableSim1 = [
        { text: 'Item name', value: 'name', width: '45%' },
        { text: 'Item type', value: 'type', width: '45%' },
        { text: 'Price', value: 'price', width: '10%' }
    ]
    dataTableSim1 = [
        {
            name: 'Smart Reward',
            type: 'Offer',
            price: '9,99€',
        },
        {
            name: 'Activation SIM',
            type: 'Activation',
            price: '5,00€',
        },
        {
            name: 'Extra 1GB',
            type: 'Option',
            price: '3,00€',
        },
        {
            name: 'Extra 5GB',
            type: 'Option',
            price: '5,00€',
        },]

    headersTableOrderHistory = [
        { text: 'Changed parameter', value: 'param'},
        { text: 'Old value', value: 'old_val'},
        { text: 'New value', value: 'new_val'},
        { text: 'Changed by', value: 'changed_by'},
        { text: 'Change time', value: 'change_time'},
    ]
    dataTableOrderHistory = [
        {
            param: 'Order created',
            old_val: '',
            new_val: '-',
            changed_by: 'system',
            change_time: '09.12.2021 15:30:00'
        },
        {
            param: 'Order status',
            old_val: '',
            new_val: 'Not finished',
            changed_by: 'system',
            change_time: '09.12.2021 15:30:00'
        },
        {
            param: 'Payment status',
            old_val: '',
            new_val: 'Not paid',
            changed_by: 'system',
            change_time: '09.12.2021 15:30:00'
        },
        {
            param: 'Order status',
            old_val: 'Not finished',
            new_val: 'New',
            changed_by: 'system',
            change_time: '09.12.2021 15:30:00'
        },
        {
            param: 'Payment status',
            old_val: 'Not paid',
            new_val: 'Paid',
            changed_by: 'system',
            change_time: '09.12.2021 15:30:00'
        },
        {
            param: 'Order status',
            old_val: 'New',
            new_val: 'In process',
            changed_by: 'Andrey Petrov',
            change_time: '09.12.2021 15:30:00'
        },
        {
            param: 'Street Name (Delivery address)',
            old_val: 'Via Tommaso Salvini',
            new_val: 'Via Salvini',
            changed_by: 'Andrey Petrov',
            change_time: '09.12.2021 15:30:00'
        },
    ]
}
</script>
