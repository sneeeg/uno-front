<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Offers" back-url="/"/>

                <div class="col-12 mt-5">
                    <router-link to="/shop/offers">
                        <v-btn depressed small color="light-blue darken-4" class="white--text">
                            Offers
                        </v-btn>
                    </router-link>
                    <router-link to="/shop/offers/categories" class="ml-3">
                        <v-btn depressed small color="white">
                            Categories
                        </v-btn>
                    </router-link>
                </div>
                <div class="col-12">
                    <v-divider></v-divider>
                </div>

                <h6 class="px-6 font-weight-bold text-uppercase">Edit</h6>

                <v-row class="mt-10">
                    <div class="col-12 bg-white pb-15">
                        <v-col>
                            <h5 class="font-weight-medium">Main information</h5>
                        </v-col>
                        <div class="col-12">
                            <v-switch
                                v-model="newOffer.publish"
                                label="Publish"
                                hide-details
                                inset
                            ></v-switch>
                        </div>
                        <div class="col-6">
                            <v-text-field
                                label="Offer name *"
                                v-model="newOffer.name"
                                hide-details="auto"
                                :rules="[() => !!newOffer.name || 'This field is required']"
                                required
                                @input="GenerateSeoUrl"
                            ></v-text-field>
                        </div>
                        <div class="col-3">
                            <v-text-field
                                label="Priority (sorting) *"
                                type="number"
                                v-model="newOffer.priority"
                                :rules="[() => !!newOffer.priority || 'This field is required']"
                                required
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="col-12">
                            <p>Category</p>
                            <div class="row d-flex">
                                <v-checkbox
                                    v-model="newOffer.category"
                                    v-for="item in OffersCategories"
                                    :key="item.uuid"
                                    :label="item.name"
                                    color="indigo darken-3"
                                    :value="item.uuid"
                                    class="col-2 mt-1"
                                    hide-details
                                ></v-checkbox>
                            </div>
                        </div>
                        <v-divider class="col-12 p-0"></v-divider>
                        <div class="col-6">
                            <p>Offer parameters</p>
                            <span>
                                A parameter with an empty value will
                                not be displayed on the site. The value 0 is not empty.* -
                                required parameters
                            </span>
                        </div>
                        <div class="col-12 row">
                            <div class="col-2">
                                <v-text-field
                                    label="Price, ??? *"
                                    v-model="newOffer.price"
                                    :rules="[() => !!newOffer.price || 'This field is required']"
                                    required
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="Data, GB"
                                    v-model="newOffer.data"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="SMS"
                                    v-model="newOffer.sms"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="Minutes"
                                    v-model="newOffer.min"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <div class="col-12 row">
                            <div class="col-6">
                                <v-text-field
                                    label="Additional Data"
                                    v-model="newOffer.additional_data"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-2">
                                <v-text-field
                                    label="Int. minutes"
                                    type="number"
                                    v-model="newOffer.int_min"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <div class="col-6">
                            <v-textarea
                                outlined
                                name="input-7-4"
                                no-resize
                                hide-details
                                label="Countries for International minutes"
                                value=""
                                v-model="newOffer.countries"
                            ></v-textarea>
                        </div>
                        <div class="col-12">
                            <v-checkbox
                                v-model="newOffer.rates_abroad"
                                label="Special rates abroad"
                                color="indigo darken-3"
                                class="m-0"
                                hide-details
                            ></v-checkbox>
                        </div>
                        <div class="col-12">
                            <v-checkbox
                                v-model="newOffer.free"
                                label="FREE activation"
                                color="indigo darken-3"
                                class="m-0"
                                hide-details
                            ></v-checkbox>
                        </div>
                        <div class="col-6">
                            <v-textarea
                                outlined
                                name="input-7-4"
                                v-model="newOffer.activation_info"
                                no-resize
                                hide-details
                                label="Activation info"
                                value=""
                            ></v-textarea>
                        </div>
                        <div class="col-12">
                            <p>Offer overview</p>
                            <ckeditor :editor="editor" :config="editorConfig" v-model="newOffer.overview" />
                        </div>
                        <div class="col-12">
                            <p>Note</p>
                            <ckeditor :editor="editor" :config="editorConfig" v-model="newOffer.note" />
                        </div>
                        <v-divider class="col-12 p-0"></v-divider>
                        <h6 class="col-12">Display options</h6>
                        <div class="col-5">
                            <v-select
                                :items="NewCategoryCardDesign"
                                v-model="newOffer.design"
                                label="Card design *"
                                :rules="[() => !!newOffer.design || 'This field is required']"
                                required
                                outlined
                            ></v-select>
                        </div>
                        <div class="row col-12">
                            <div class="col-4">
                                <h6>Photo for list of offers</h6>
                                <span>The photo must be in .jpg or .png format. Size 700*350 pixels</span>
                                <v-file-input
                                    show-size
                                    v-model="newOffer.photo_list"
                                    label="Upload file"
                                    hide-details
                                ></v-file-input>
                            </div>
                            <div class="col-4">
                                <h6>Photo for Slide on desktop screens</h6>
                                <span>
                                    The photo must be in .jpg or .png format.
                                    For Blue or Orange design -  size 800*800 pixels
                                    For Transparent design - size 1400*800 pixels
                                </span>
                                <v-file-input
                                    show-size
                                    v-model="newOffer.photo_slide"
                                    label="Upload file"
                                    hide-details
                                ></v-file-input>
                            </div>
                            <div class="col-4">
                                <h6>Photo for Slide on mobile screens</h6>
                                <span>
                                    The photo must be in .jpg or .png format.
                                    For Blue or Orange design -  size 450*300 pixels
                                    For Transparent design - size 450*680 pixels
                                </span>
                                <v-file-input
                                    show-size
                                    v-model="newOffer.photo_slide_m"
                                    label="Upload file"
                                    hide-details
                                ></v-file-input>
                            </div>
                        </div>
                        <h6 class="col-12">Where display</h6>
                        <div class="col-12 row">
                            <v-checkbox
                                v-model="newOffer.display_offers"
                                label="in OFFERS PAGE"
                                color="indigo darken-3"
                                class="col-3"
                                hide-details
                            ></v-checkbox>
                            <v-checkbox
                                v-model="newOffer.display_home"
                                label="in HOME PAGE"
                                color="indigo darken-3"
                                class="col-3"
                                hide-details
                            ></v-checkbox>
                            <v-checkbox
                                v-model="newOffer.display_slider"
                                label="in SLIDER"
                                color="indigo darken-3"
                                class="col-3"
                                hide-details
                            ></v-checkbox>
                        </div>
                        <v-divider class="col-12 p-0"></v-divider>
                        <h6 class="col-12">Tariff transparency</h6>
                        <div class="col-12 row">
                            <v-radio-group row v-model="newOffer.active">
                                <v-radio
                                    :label="'Offerte attivabili'"
                                    :value="'active'"
                                    color="indigo darken-3"
                                ></v-radio>
                                <v-radio
                                    :label="'Offerte non pi?? attivabili'"
                                    :value="'non_active'"
                                    color="indigo darken-3"
                                ></v-radio>
                            </v-radio-group>
                        </div>
                        <div class="col-12">
                            <p>Overview for Tariff transparency</p>
                            <v-textarea
                                outlined
                                no-resize
                                v-model="newOffer.tariff_overview"
                                class="mt-4"
                            ></v-textarea>
                        </div>
                        <div class="col-12 row">
                            <div class="col-4">
                                <h6>Informative prospect</h6>
                                <span>The file must be in PDF format</span>
                                <v-file-input
                                    show-size
                                    label="Upload file"
                                    v-model="newOffer.prospects_info"
                                    hide-details
                                ></v-file-input>
                            </div>
                            <div class="col-4 ml-10">
                                <h6>Contract summary</h6>
                                <span>
                                    The file must be in PDF format
                                </span>
                                <v-file-input
                                    show-size
                                    label="Upload file"
                                    v-model="newOffer.contract"
                                    hide-details
                                ></v-file-input>
                            </div>
                        </div>
                        <v-divider class="col-12 p-0 mt-10"></v-divider>
                        <h6 class="col-12">For E-SHOP</h6>
                        <div class="col-12 row">
                            <div class="col-2">
                                <v-text-field
                                    label="Price, ??? *"
                                    hide-details="auto"
                                    v-model="newOffer.shop_price"
                                    :rules="[() => !!newOffer.shop_price || 'This field is required']"
                                    type="number"
                                    required
                                ></v-text-field>
                            </div>
                            <div class="col-3">
                                <v-text-field
                                    label="Activation price (for NEW user)"
                                    v-model="newOffer.activation_price"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <v-checkbox
                            v-model="newOffer.is_porting"
                            label="Offer can be PORTING"
                            class="col-12"
                            color="indigo darken-3"
                            hide-details
                        ></v-checkbox>
                        <div class="col-12 row">
                            <div class="col-3">
                                <v-text-field
                                    label="Activation price for Vodafone *"
                                    v-model="newOffer.price_vodafone"
                                    :rules="[() => !!newOffer.price_vodafone || 'This field is required']"
                                    required
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-3">
                                <v-text-field
                                    label="Activation price for other operators"
                                    v-model="newOffer.price_others"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                        </div>
                        <v-divider class="col-12 p-0 mt-10"></v-divider>
                        <h6 class="col-12">SEO section</h6>
                        <v-text-field
                            label="Title"
                            v-model="newOffer.title"
                            class="col-5"
                            hide-details="auto"
                        ></v-text-field>
                        <v-textarea
                            outlined
                            name="input-7-4"
                            v-model="newOffer.description"
                            no-resize
                            hide-details
                            label="Description"
                            class="col-5 mt-10 ml-2"
                        ></v-textarea>
                        <v-textarea
                            outlined
                            name="input-7-4"
                            v-model="newOffer.keywords"
                            no-resize
                            hide-details
                            label="Keywords"
                            class="col-5 mt-10 ml-2"
                        ></v-textarea>
                        <v-text-field
                            label="URL"
                            class="col-5"
                            v-model="newOffer.url"
                            hide-details="auto"
                            @input="ValidateSeoUrl"
                        ></v-text-field>
                    </div>
                </v-row>
                <div class="col-12">
                    <div class="col-12 bg-light">
                        <router-link to="/shop/offers">
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
                            depressed
                            :disabled="!newOffer.name || !newOffer.priority || !newOffer.price || !newOffer.design || !newOffer.shop_price || !newOffer.price_vodafone"
                            @click="OnClickSubmit">
                            Save
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </standart-template>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageHeader from "@/components/UI/PageHeader.vue";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import DataOffers from "@/data/AdminPanel/DataOffers";
import ApiEnter from "@/api/ApiEnter";
import IAdminPanelOffersCategoriesList from "@/struct/admin-panel/IAdminPanelOffersCategoriesList";
import ApiOffer from "@/api/ApiOffer";
import sweetalert from "sweetalert";
import ApiAdmin from "@/api/ApiAdmin";
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import List from '@ckeditor/ckeditor5-list/src/list';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize.js';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import SpecialCharactersLatin from '@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin';
import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical';
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar'
import AutoImage from "@ckeditor/ckeditor5-image/src/autoimage";
import FindAndReplace from "@ckeditor/ckeditor5-find-and-replace/src/findandreplace";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Link from "@ckeditor/ckeditor5-link/src/link";
import AutoLink from "@ckeditor/ckeditor5-link/src/autolink";


@Component({
    components: { StandartTemplate, PageHeader }
})
export default class OfferCreate extends Vue {
    public editor = ClassicEditor
    public editorConfig = {
        plugins: [ EssentialsPlugin, Bold, Italic, Alignment, Heading, Highlight, FontBackgroundColor, FontColor, FontFamily, FontSize, BlockQuote, Underline, AutoImage, Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload, List, TodoList, Indent, IndentBlock, Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar, Code, CodeBlock, HorizontalLine, PageBreak, RemoveFormat, SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText, MediaEmbed, MediaEmbedToolbar, FindAndReplace, SourceEditing, Subscript, Superscript, Link, AutoLink ],
        toolbar: [
            'Heading',
            'bold', 'italic', 'underline', 'alignment', 'link', '|',
            'undo', 'redo', '|',
            'blockQuote', '|',
            'horizontalLine',
            'outdent', 'indent', '|',
            'fontSize', 'fontColor', 'fontBackgroundColor', 'Highlight', '|',
            'bulletedList', 'numberedList', '|',
            'mediaEmbed', 'imageUpload', 'insertTable', '|',
            'code', 'codeBlock', 'sourceEditing', '|',
            'pageBreak', 'findAndReplace', '|',
            'removeFormat', 'specialCharacters', 'subscript', 'superscript']
    }
    private Breadcrumbs: BreadcrumbsItemType[] = DataOffers.OfferCreateBreadcrumbs;
    private NewCategoryCardDesign: string[] = ['Blue', 'Orange', 'Transparent']
    private OffersCategories: IAdminPanelOffersCategoriesList[] | undefined = []

    private newOffer: any = {
        name: '',
        priority: '',
        publish: true,
        category: [],
        price: '',
        data: '',
        sms: '',
        min: '',
        additional_data: '',
        int_min: '',
        countries: '',
        rates_abroad: false,
        free: false,
        activation_info: '',
        display_roaming: true,
        overview: '',
        note: '',
        design: '',
        photo_list: null,
        photo_slide: null,
        photo_slide_m: null,
        display_offers: false,
        display_home: false,
        display_slider: false,
        active: 'active',
        tariff_overview: '',
        prospects_info: null,
        contract: null,
        shop_price: '',
        activation_price: '',
        is_porting: true,
        price_vodafone: '',
        price_others: '',
        title: '',
        description: '',
        keywords: '',
        url: ''
    }

    private Translit(str) {
        let ru=("??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??-??").split("-")
        let en=("A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya").split("-")
        let res = '';
        for(let i=0, l=str.length; i<l; i++)
        {
            let s = str.charAt(i), n = ru.indexOf(s);
            if(n >= 0) { res += en[n]; }
            else { res += s; }
        }
        return res;
    }

    private GenerateSeoUrl() {
        let url = this.Translit(this.newOffer.name.replace(/[\s]+/gi, '-'))
        this.newOffer.url = url.replace(/[^0-9a-z_-]+/gi, '').toLowerCase()
        // this.newOffer.url = this.newOffer.name.replace(/[. ,:-=&+#$?|%@!^(){}'*]+/g, "-").toLowerCase()
    }

    private ValidateSeoUrl() {
        this.newOffer.url = this.Translit(this.newOffer.url.replace(/[. ,$@!^()'*]+/g, '-').toLowerCase())
        // this.newOffer.url = this.newOffer.url.replace(/[. ,$@!^()'*]+/g, '-').toLowerCase()
    }

    private async getOffersCategories(): Promise<void> {
        try {
            this.OffersCategories = await ApiOffer.GetOfferCategories(ApiEnter.CurrentSessionUUID as string);
        } catch (e) {
            console.error(e);
        }
    }

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const offer_uuid = await ApiOffer.CreateOffer(
                ApiEnter.CurrentSessionUUID,
                this.newOffer.name,
                this.newOffer.priority,
                this.newOffer.publish? 1: 0,
                this.newOffer.category.join(),
                this.newOffer.price,
                this.newOffer.data,
                this.newOffer.sms,
                this.newOffer.min,
                this.newOffer.additional_data,
                this.newOffer.int_min,
                this.newOffer.countries,
                this.newOffer.rates_abroad? 1 : 0,
                this.newOffer.free? 1: 0,
                this.newOffer.activation_info,
                this.newOffer.display_roaming? 1: 0,
                this.newOffer.overview,
                this.newOffer.note,
                this.newOffer.design,
                this.newOffer.photo_list != null? await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID, this.newOffer.photo_list) as string : '',
                this.newOffer.photo_slide != null? await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID, this.newOffer.photo_slide) as string : '',
                this.newOffer.photo_slide_m != null? await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID, this.newOffer.photo_slide_m) as string : '',
                this.newOffer.display_offers? 1 : 0,
                this.newOffer.display_home? 1 : 0,
                this.newOffer.display_slider? 1 : 0,
                this.newOffer.active === 'active'? 1: 0,
                this.newOffer.tariff_overview,
                this.newOffer.prospects_info != null? await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID, this.newOffer.prospects_info) as string : '',
                this.newOffer.contract != null? await ApiAdmin.UploadFile(ApiEnter.CurrentSessionUUID, this.newOffer.contract) as string : '',
                this.newOffer.shop_price,
                this.newOffer.activation_price,
                this.newOffer.is_porting? 1: 0,
                this.newOffer.price_vodafone,
                this.newOffer.price_others,
                this.newOffer.title,
                this.newOffer.description,
                this.newOffer.keywords,
                this.newOffer.url);
            if (offer_uuid == undefined || offer_uuid.length != 36) {
                await sweetalert({
                    title: "Request error!",
                    text: "Creating error Offer: " + offer_uuid,
                    icon: "info"
                });
                return;
            }

            sweetalert({
                title: "Success!",
                text: `Offer has created!`,
                icon: "success"
            }).then(() => {
                this.$forceUpdate()
                this.$router.push(`/shop/offers`);
            })
        }
    }

    async mounted() {
        await this.getOffersCategories()
    }
}
</script>
