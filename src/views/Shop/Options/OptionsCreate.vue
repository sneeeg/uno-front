<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Extras and Services" back-url="/"/>

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
                                v-model="newOption.publish"
                                label="Publish"
                                hide-details
                                inset
                            ></v-switch>
                        </div>
                        <div class="col-5">
                            <v-radio-group row v-model="newOption.type">
                                <v-radio
                                    :label="'Extra'"
                                    :value="'extra'"
                                    color="indigo darken-3"
                                ></v-radio>
                                <v-radio
                                    :label="'Service'"
                                    :value="'service'"
                                    color="indigo darken-3"
                                ></v-radio>
                            </v-radio-group>
                        </div>
                        <div class="col-6">
                            <v-text-field
                                label="Name *"
                                v-model="newOption.name"
                                hide-details="auto"
                                @input="GenerateSeoUrl"
                            ></v-text-field>
                        </div>
                        <div class="col-3">
                            <v-text-field
                                label="Priority (sorting) *"
                                type="number"
                                v-model="newOption.priority"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <v-divider class="col-12 p-0"></v-divider>
                        <div class="col-6">
                            <h6>Parameters</h6>
                            <span>
                                A parameter with an empty value will
                                not be displayed on the site. The value 0 is not empty.* -
                                required parameters
                            </span>
                        </div>
                        <div class="col-12 row d-flex align-center">
                            <div class="col-2">
                                <v-text-field
                                    label="Price, € *"
                                    v-model="newOption.price"
                                    type="number"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-4 py-0">
                                <v-select
                                    :items="PeriodTypes"
                                    v-model="newOption.period"
                                    label="Period"
                                    hide-details
                                    clearable
                                    dense
                                    outlined
                                    @click:clear="$nextTick(() => newOption.period = '')"
                                ></v-select>
                            </div>
                        </div>
                        <div class="col-12 row d-flex align-center">
                            <div class="col-2">
                                <v-text-field
                                    label="Value"
                                    v-model="newOption.value"
                                    hide-details="auto"
                                ></v-text-field>
                            </div>
                            <div class="col-4 py-0">
                                <v-select
                                    :items="MeasureTypes"
                                    v-model="newOption.measure"
                                    label="Measure"
                                    hide-details
                                    dense
                                    clearable
                                    outlined
                                    @click:clear="$nextTick(() => newOption.measure = '')"
                                ></v-select>
                            </div>
                        </div>
                        <div class="col-6">
                            <v-text-field
                                label="How to connect"
                                v-model="newOption.connect"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="col-6">
                            <v-text-field
                                label="Link for Button «How to connect»"
                                v-model="newOption.link_for_button"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="col-6">
                            <v-text-field
                                label="Limits"
                                v-model="newOption.limits"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="col-12">
                            <p>Overview</p>
                            <ckeditor :editor="editor" :config="editorConfig" v-model="newOption.overview" />
                        </div>
                        <div class="col-12">
                            <p>Note</p>
                            <ckeditor :editor="editor" :config="editorConfig" v-model="newOption.note" />
                        </div>
                        <v-divider class="col-12 p-0"></v-divider>
                        <h6 class="col-12">For E-SHOP</h6>
                        <div class="col-12 row">
                            <div class="col-6">
                                <v-select
                                    :items="['value 1', 'value 2', 'value 3']"
                                    v-model="newOption.bss"
                                    label="Matching with an option from BSS"
                                    hide-details
                                    dense
                                    outlined
                                ></v-select>
                            </div>
                        </div>
                        <div class="col-12 row">
                            <div class="col-1">
                                <p class="font-weight-bold">Price</p>
                            </div>
                            <div class="col-3">
                                <p>3.00 €</p>
                            </div>
                        </div>
                        <div class="col-12 row mt-0 py-0">
                            <div class="col-1">
                                <p class="font-weight-bold">Period</p>
                            </div>
                            <div class="col-3">
                                <p>messe</p>
                            </div>
                        </div>
                        <v-divider class="col-12 p-0 mt-10"></v-divider>
                        <h6 class="col-12">SEO section</h6>
                        <v-text-field
                            label="Title"
                            v-model="newOption.seo_title"
                            class="col-5"
                            hide-details="auto"
                        ></v-text-field>
                        <v-textarea
                            outlined
                            name="input-7-4"
                            v-model="newOption.seo_description"
                            no-resize
                            hide-details
                            label="Description"
                            class="col-5 mt-10 ml-2"
                        ></v-textarea>
                        <v-textarea
                            outlined
                            name="input-7-4"
                            v-model="newOption.seo_keywords"
                            no-resize
                            hide-details
                            label="Keywords"
                            class="col-5 mt-10 ml-2"
                        ></v-textarea>
                        <v-text-field
                            label="URL"
                            class="col-5"
                            v-model="newOption.seo_url"
                            hide-details="auto"
                            @input="ValidateSeoUrl"
                        ></v-text-field>
                    </div>
                </v-row>
                <div class="col-12 px-0">
                    <div class="col-12 bg-light">
                        <router-link to="/shop/options">
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
                            :disabled="newOption.name ==='' || newOption.priority === '' || newOption.price === ''"
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
import ApiEnter from "@/api/ApiEnter";
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import ApiShopOptions from "@/api/ApiShopOptions";
import sweetalert from "sweetalert";
import DataOptions from "@/data/AdminPanel/DataOptions";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import List from "@ckeditor/ckeditor5-list/src/list";
import TodoList from "@ckeditor/ckeditor5-list/src/todolist";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableCaption from "@ckeditor/ckeditor5-table/src/tablecaption";
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
import TableColumnResize from "@ckeditor/ckeditor5-table/src/tablecolumnresize";
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";
import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak";
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat";
import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters";
import SpecialCharactersArrows from "@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows";
import SpecialCharactersCurrency from "@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency";
import SpecialCharactersEssentials from "@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials";
import SpecialCharactersLatin from "@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin";
import SpecialCharactersMathematical from "@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical";
import SpecialCharactersText from "@ckeditor/ckeditor5-special-characters/src/specialcharacterstext";

@Component({
    components: { StandartTemplate, PageHeader, CKEditor }
})
export default class OptionsCreate extends Vue {
    public editor = ClassicEditor
    public editorConfig = {
        plugins: [ EssentialsPlugin, Bold, Italic, Alignment, Heading, Highlight, FontBackgroundColor, FontColor, FontFamily, FontSize, BlockQuote, Underline, List, TodoList, Indent, IndentBlock, Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar, Code, CodeBlock, HorizontalLine, PageBreak, RemoveFormat, SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText ],
        toolbar: [
            'Heading',
            'bold', 'italic', 'underline', 'alignment' , '|',
            'undo', 'redo', '|',
            'blockQuote', '|',
            'horizontalLine',
            'outdent', 'indent', '|',
            'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', 'Highlight', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'insertTable', '|',
            'code', 'codeBlock', '|',
            'pageBreak', '|',
            'removeFormat', 'specialCharacters']
    }
    private Breadcrumbs: BreadcrumbsItemType[] = DataOptions.BreadcrumbsCreate;

    private PeriodTypes: string[] = ['ora', 'giorno', 'settimana', 'mese', 'anno']
    private MeasureTypes: string[] = ['SMS', 'Giga', 'SIM', 'Minuti', 'Pezzo', 'Servizio']

    private newOption: any = {
        name: '',
        priority: '',
        publish: true,
        type: 'extra',
        price: '',
        period: '',
        value: '',
        measure: '',
        connect: '',
        link_for_button: '',
        limits: '',
        overview: '',
        note: '',
        bss: '',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        seo_url: ''
    }

    private GenerateSeoUrl() {
        let url = this.Translit(this.newOption.name.replace(/[\s]+/gi, '-'))
        this.newOption.seo_url = url.replace(/[^0-9a-z_-]+/gi, '').toLowerCase()
        // this.newOption.seo_url = this.newOption.name.replace(/[. ,:-=&+#$?|%@!^(){}'*]+/g, "-").toLowerCase()
    }

    private Translit(str) {
        let ru=("А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я").split("-")
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

    private ValidateSeoUrl() {
        this.newOption.seo_url = this.Translit(this.newOption.seo_url.replace(/[. ,$@!^()'*]+/g, '-').toLowerCase())
    }

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const option_uuid = await ApiShopOptions.CreateOption(
                ApiEnter.CurrentSessionUUID,
                this.newOption.name,
                this.newOption.priority,
                this.newOption.publish? 1: 0,
                this.newOption.type,
                this.newOption.price,
                this.newOption.period,
                this.newOption.value,
                this.newOption.measure,
                this.newOption.connect,
                this.newOption.link_for_button,
                this.newOption.limits,
                this.newOption.overview,
                this.newOption.note,
                this.newOption.bss,
                this.newOption.seo_title,
                this.newOption.seo_description,
                this.newOption.seo_keywords,
                this.newOption.seo_url);
            if (option_uuid == undefined || option_uuid.length != 36) {
                await sweetalert({
                    title: "Request error!",
                    text: "Creating error Option: " + option_uuid,
                    icon: "info"
                });
                return;
            }

            sweetalert({
                title: "Success!",
                text: `Option has created!`,
                icon: "success"
            }).then(() => {
                this.$forceUpdate()
                this.$router.push(`/shop/options`);
            })
        }
    }
}
</script>
