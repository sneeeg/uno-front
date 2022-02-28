<template>
    <div class="page-container company-create-page">
        <standart-template>
            <div class="container">
                <v-form ref="ValidateForms">
                    <div class="row mt-1">
                        <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                        <page-header title="Создание новой компании" back-url="/company/list/"/>
                        <div class="col-12">
                            <div class="well">
                                <div class="well-wrapper">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="row">
                                                <form-generator ref="company-form-generator" title="Данные о компании"
                                                                :form-model="CompanyInfoModel"/>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-12 mb-4">
                                                    <div class="row">
                                                        <form-generator ref="contact-form-generator" title="Контактная информация"
                                                                        :form-model="ContactInfoModel"/>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="row">
                                                        <form-generator ref="finance-form-generator" title="Финансовая информация"
                                                                        :form-model="FinanceInfoModel"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 text-center mt-4 pt-3 mb-5 border-top">
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <v-btn class="mr-3" color="orange" @click="OnClickHelp()">Помощь</v-btn>
                                                <v-btn color="success" @click="OnClickSubmit()" :loading="HasRequest">Создать компанию
                                                </v-btn>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-form>

            </div>
        </standart-template>
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import sweetalert from "sweetalert";
import ApiCompany from "@/api/ApiCompany";
import ApiEnter from "@/api/ApiEnter";
import { Action } from "vuex-class";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import DataCompanyCreate from "@/data/Company/DataCompanyCreate";
import PageHeader from "@/components/UI/PageHeader.vue";
import { FormGeneratorListInputModelType } from "@/struct/form/FormGenerator/FormGeneratorListInputModelType";
import FormGenerator from "@/components/UI/Form/FormGenerator.vue";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";


@Component({
    components: { StandartTemplate, PageHeader, FormGenerator }
})
export default class CompanyCreate extends Vue {
    @Action("doSetCurrentCompanyItem") private DoSetCurrentCompanyItem!: (company_uuid: string | undefined) => Promise<void>;
    @Action("doUpdateCurrentCompanyList") private DoUpdateCurrentCompanyList!: () => Promise<void>;

    private Breadcrumbs: BreadcrumbsItemType[] = DataCompanyCreate.Breadcrumbs;

    @Ref("company-form-generator") private CompanyFormGenerator!: FormGenerator;
    private CompanyInfoModel: FormGeneratorListInputModelType = DataCompanyCreate.CompanyInfoModel;
    @Ref("contact-form-generator") private ContactFormGenerator!: FormGenerator;
    private ContactInfoModel: FormGeneratorListInputModelType = DataCompanyCreate.ContactInfoModel;
    @Ref("finance-form-generator") private FinanceFormGenerator!: FormGenerator;
    private FinanceInfoModel: FormGeneratorListInputModelType = DataCompanyCreate.FinanceInfoModel;


    private HasRequest!: boolean;

    private created() {
        this.HasRequest = false;
    }

    private mounted(): void {
        document.title = "Создание новой компании";
    }

    private async OnClickSubmit(): Promise<void> {

        const validate: boolean = this.CompanyFormGenerator.CurrentForm.validate() && this.ContactFormGenerator.CurrentForm.validate() && this.FinanceFormGenerator.CurrentForm.validate();

        if (!validate) {
            sweetalert({
                title: "Ошибка в форме!",
                text: "Вы заполнили не все поля или есть ошибки!",
                icon: "error"
            });
            return;
        }

        if (ApiEnter.CurrentSessionUUID != undefined) {
            this.HasRequest = true;
            this.$forceUpdate();

            const company_uuid = await ApiCompany.CreateCompanyFromSession(ApiEnter.CurrentSessionUUID, this.CompanyInfoModel.Name.value, this.CompanyInfoModel.Inn.value, this.CompanyInfoModel.Ogrn.value, this.CompanyInfoModel.OfficalName.value);
            if (company_uuid == undefined || company_uuid.length != 36) {
                sweetalert({
                    title: "Ошибка запроса!",
                    text: "Ошибка создания компании: " + company_uuid,
                    icon: "info"
                });
                return;
            }

            this.DoUpdateCurrentCompanyList();

            ApiCompany.UpdateCompanyLegalInfoFromSession(ApiEnter.CurrentSessionUUID, company_uuid, this.CompanyInfoModel.OfficalAddress.value, this.CompanyInfoModel.OfficalName.value, this.CompanyInfoModel.Address.value);
            ApiCompany.UpdateCompanyContactInfoFromSession(ApiEnter.CurrentSessionUUID, company_uuid, this.ContactInfoModel.CeoFullName.value, this.ContactInfoModel.CompanyEmail.value, this.ContactInfoModel.CompanyPhone.value);
            ApiCompany.UpdateCompanyBankInfoFromSession(ApiEnter.CurrentSessionUUID, company_uuid, this.FinanceInfoModel.BankRs.value, this.FinanceInfoModel.Bik.value, this.FinanceInfoModel.BankKs.value, this.FinanceInfoModel.BankName.value);
            await this.DoSetCurrentCompanyItem(company_uuid);

            this.HasRequest = false;
            this.$forceUpdate();

            sweetalert({
                title: "Успех!",
                text: `Компания успешно создана!`,
                icon: "success"
            }).then(() => {
                this.$router.push(`/company/dashboard/${company_uuid}`);
            });
        }
    }

    private OnClickHelp(): void {
        sweetalert({
            title: "Упс...",
            text: "Раздел помощи на стадии разработки, функционал будет доступен позже.",
            icon: "info"
        });
    }
}
</script>
