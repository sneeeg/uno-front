<template>
    <standart-template>
        <div class="container">
            <div class="row mt-1">
                <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                <page-header title="Options and Services" back-url="/"/>

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
                        <div class="col-6">
                            <v-text-field
                                label="Option name"
                                v-model="newOption.name"
                                hide-details="auto"
                                @input="GenerateSeoUrl"
                            ></v-text-field>
                        </div>
                        <div class="col-3">
                            <v-text-field
                                label="Priority (sorting)"
                                type="number"
                                v-model="newOption.priority"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <v-divider class="col-12 p-0"></v-divider>
                        <div class="col-6">
                            <h6>Option parameters</h6>
                            <span>
                                A parameter with an empty value will
                                not be displayed on the site. The value 0 is not empty.* -
                                required parameters
                            </span>
                        </div>
                        <div class="col-12 row d-flex align-center">
                            <div class="col-2">
                                <v-text-field
                                    label="Price, €"
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
                                    dense
                                    outlined
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
                                    outlined
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
                                label="Limits"
                                v-model="newOption.limits"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="col-12">
                            <p>Overview</p>
                            <editor
                                api-key="no-api-key"
                                v-model="newOption.overview"
                                class="mt-4"
                                :init="{
                                             height: 500,
                                             menubar: false,
                                             toolbar: 'undo redo | bold italic underline strikethrough | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | indent outdent | bullist numlist | forecolor backcolor casechange formatpainter removeformat | pagebreak | emoticons charmap | link image media pageembed anchor | table',
                                             plugins: 'anchor lists advlist image media link pagebreak emoticons charmap casechange formatpainter code pageembed table',
                                             formats: {
                                                borderstyle: { selector: 'td,th', styles: { borderTopStyle: 'solid', borderRightStyle: 'solid', borderBottomStyle: 'solid', borderLeftStyle: 'solid', }, remove_similar: true },
                                                bordercolor: { selector: 'td,th', styles: { borderTopColor: '#32CD32', borderRightColor: '#32CD32', borderBottomColor: '#32CD32', borderLeftColor: '#32CD32' }, remove_similar: true },
                                                backgroundcolor: { selector: 'td,th', styles: { backgroundColor: '#006400' }, remove_similar: true },
                                                formatpainter_removeformat: [
                                                  { selector: 'b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins',
                                                    remove: 'all',
                                                    split: true,
                                                    expand: false,
                                                    block_expand: true,
                                                    deep: true
                                                  },
                                                  { selector: 'span',
                                                    attributes: ['style', 'class'],
                                                    remove: 'empty',
                                                    split: true,
                                                    expand: false,
                                                    deep: true
                                                  },
                                                  { selector: '*:not(tr,td,th,table)',
                                                    attributes: ['style', 'class'],
                                                    split: false,
                                                    expand: false,
                                                    deep: true
                                                  }
                                                ]
                                              },
                                       }"/>
                        </div>
                        <div class="col-12">
                            <p>Note</p>
                            <editor
                                api-key="no-api-key"
                                class="mt-4"
                                v-model="newOption.note"
                                :init="{
                                             height: 500,
                                             menubar: false,
                                             toolbar: 'undo redo | bold italic underline strikethrough | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | indent outdent | bullist numlist | forecolor backcolor casechange formatpainter removeformat | pagebreak | emoticons charmap | link image media pageembed anchor | table',
                                             plugins: 'anchor lists advlist image media link pagebreak emoticons charmap casechange formatpainter code pageembed table',
                                             formats: {
                                                borderstyle: { selector: 'td,th', styles: { borderTopStyle: 'solid', borderRightStyle: 'solid', borderBottomStyle: 'solid', borderLeftStyle: 'solid', }, remove_similar: true },
                                                bordercolor: { selector: 'td,th', styles: { borderTopColor: '#32CD32', borderRightColor: '#32CD32', borderBottomColor: '#32CD32', borderLeftColor: '#32CD32' }, remove_similar: true },
                                                backgroundcolor: { selector: 'td,th', styles: { backgroundColor: '#006400' }, remove_similar: true },
                                                formatpainter_removeformat: [
                                                  { selector: 'b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins',
                                                    remove: 'all',
                                                    split: true,
                                                    expand: false,
                                                    block_expand: true,
                                                    deep: true
                                                  },
                                                  { selector: 'span',
                                                    attributes: ['style', 'class'],
                                                    remove: 'empty',
                                                    split: true,
                                                    expand: false,
                                                    deep: true
                                                  },
                                                  { selector: '*:not(tr,td,th,table)',
                                                    attributes: ['style', 'class'],
                                                    split: false,
                                                    expand: false,
                                                    deep: true
                                                  }
                                                ]
                                              },
                                       }"/>
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
                            :disabled="newOption.name ==='' || newOption.price === '' || newOption.value === '' || newOption.seo_url === ''"
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
import Editor from '@tinymce/tinymce-vue'
import ApiOffer from "@/api/ApiOffer";
import ApiShopOptions from "@/api/ApiShopOptions";
import sweetalert from "sweetalert";
import DataOptions from "@/data/AdminPanel/DataOptions";

@Component({
    components: { StandartTemplate, PageHeader, Editor }
})
export default class OptionsCreate extends Vue {
    private Breadcrumbs: BreadcrumbsItemType[] = DataOptions.BreadcrumbsCreate;

    private PeriodTypes: string[] = ['ora', 'giorno', 'settimana', 'mese', 'anno']
    private MeasureTypes: string[] = ['SMS', 'GB', 'SIM', 'Minutes']

    private newOption: any = {
        name: '',
        priority: '',
        publish: true,
        price: '',
        period: '',
        value: '',
        measure: '',
        connect: '',
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
        this.newOption.seo_url = this.newOption.name.replace(/[. ,:-=&+#$?|%@!^(){}'*]+/g, "-").toLowerCase()
    }

    private ValidateSeoUrl() {
        this.newOption.seo_url = this.newOption.seo_url.replace(/[. ,$@!^()'*]+/g, '-').toLowerCase()
    }

    private async OnClickSubmit(): Promise<void> {
        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.$forceUpdate();

            const option_uuid = await ApiShopOptions.CreateOption(
                ApiEnter.CurrentSessionUUID,
                this.newOption.name,
                this.newOption.priority,
                this.newOption.publish? 1: 0,
                this.newOption.price,
                this.newOption.period,
                this.newOption.value,
                this.newOption.measure,
                this.newOption.connect,
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
