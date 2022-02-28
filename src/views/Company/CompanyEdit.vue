<template>
    <div class="page-container company-edit-page">
        <standart-template>
            <div class="container">
                <div class="row" v-if="HasLoadedForm == false">
                    <div class="col-8 offset-2">
                        <v-progress-linear indeterminate color="cyan"/>
                    </div>
                </div>
                <div class="row mt-1" v-else>
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"></v-breadcrumbs>
                    <page-header :title="'Редактирование компании: (' + GetCurrentCompanyItem.id + ') ' + GetCurrentCompanyItem.name" :back-url="'/company/dashboard/' + GetCurrentCompanyItem.uuid"></page-header>
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
                                            <v-btn color="success" @click="OnClickSubmit()" :loading="HasRequest" :disabled="HasRequest">Сохранить Изменения</v-btn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </standart-template>
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import sweetalert from "sweetalert";
import ApiCompany from "@/api/ApiCompany";
import ApiEnter from "@/api/ApiEnter";
import { Action, Getter, Mutation } from "vuex-class";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";
import CompanyLegalInfoTableRowType from "@/struct/company/CompanyLegalInfoTableRowType";
import CompanyBankInfoTableRowType from "@/struct/company/CompanyBankInfoTableRowType";
import CompanyContactInfoTableRowType from "@/struct/company/CompanyContactInfoTableRowType";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import PageHeader from "@/components/UI/PageHeader.vue";
import FormGenerator from "@/components/UI/Form/FormGenerator.vue";
import DataCompanyEdit from "@/data/Company/DataCompanyEdit";
import { FormGeneratorListInputModelType } from "@/struct/form/FormGenerator/FormGeneratorListInputModelType";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";

@Component({
    components: { StandartTemplate, PageHeader, FormGenerator }
})
export default class CompanyEdit extends Vue {

    @Getter("getCurrentCompanyList") private GetCurrentCompanyList!: CompanyTableRowType[] | undefined;
    @Getter("getCurrentCompanyItem") private GetCurrentCompanyItem!: CompanyTableRowType | undefined;

    @Action("doSetCurrentCompanyItem") private DoSetCurrentCompanyItem!: (company_uuid: string | undefined) => Promise<void>;
    @Action("doUpdateCurrentCompanyItem") private DoUpdateCurrentCompanyItem!: () => Promise<void>;
    @Action("doUpdateCurrentCompanyList") private DoUpdateCurrentCompanyList!: () => Promise<void>;

    @Mutation("setCurrentCompanyItem") private SetCurrentCompanyItem!: (payload: CompanyTableRowType | null) => void;

    private Breadcrumbs!: BreadcrumbsItemType[];
    @Ref("company-form-generator") private CompanyFormGenerator!: FormGenerator;
    private CompanyInfoModel: FormGeneratorListInputModelType = DataCompanyEdit.CompanyInfoModel;
    @Ref("contact-form-generator") private ContactFormGenerator!: FormGenerator;
    private ContactInfoModel: FormGeneratorListInputModelType = DataCompanyEdit.ContactInfoModel;
    @Ref("finance-form-generator") private FinanceFormGenerator!: FormGenerator;
    private FinanceInfoModel: FormGeneratorListInputModelType = DataCompanyEdit.FinanceInfoModel;


    private HasLoadedForm!: boolean;
    private HasRequest!: boolean;
    private CurrentCompanyUUID!: string;

    private created() {
        this.Breadcrumbs = DataCompanyEdit.GetBreadcrumbs(this.GetCurrentCompanyItem);
        this.HasLoadedForm = false;
        this.HasRequest = false;

        this.CurrentCompanyUUID = this.$route.params.company_uuid;
        this.DoLoadForm();
    }

    private async DoLoadForm(): Promise<void> {
        const companyInfo: CompanyTableRowType | null = await ApiCompany.GetCompanyItemFromSession(ApiEnter.CurrentSessionUUID as string, this.CurrentCompanyUUID);
        if (companyInfo == undefined) {
            sweetalert({
                title: "Упс!",
                text: "Компания по вашему запросу - отсуствует!",
                icon: "error"
            }).then(() => {
                this.$router.push("/");
            });
            return;
        }

        document.title = "Редактирование компании: (" + companyInfo.id + ") " + companyInfo.name;
        this.SetCurrentCompanyItem(companyInfo);

        const legalInfo: CompanyLegalInfoTableRowType | null = await ApiCompany.GetCompanyLegalInfoFromSession(ApiEnter.CurrentSessionUUID as string, this.CurrentCompanyUUID);
        const contactInfo: CompanyContactInfoTableRowType | null = await ApiCompany.GetCompanyContactInfoFromSession(ApiEnter.CurrentSessionUUID as string, this.CurrentCompanyUUID);
        const bankInfo: CompanyBankInfoTableRowType | null = await ApiCompany.GetCompanyBankInfoFromSession(ApiEnter.CurrentSessionUUID as string, this.CurrentCompanyUUID);

        if (legalInfo == undefined || contactInfo == undefined || bankInfo == undefined) {
            sweetalert({
                title: "Упс!",
                text: "Во время загрузки информации - возникла ошибка, не все данные были заружены!",
                icon: "error"
            }).then(() => {
                this.$router.push("/");
            });
            return;
        }

        this.SetInputValue(this.CompanyInfoModel.Name, this.GetCurrentCompanyItem?.name as string);

        this.SetInputValue(this.CompanyInfoModel.Address, legalInfo.address);
        this.SetInputValue(this.CompanyInfoModel.OfficalAddress, legalInfo.offical_addres);
        this.SetInputValue(this.CompanyInfoModel.OfficalName, legalInfo.offical_name);
        this.SetInputValue(this.CompanyInfoModel.Ogrn, legalInfo.offical_ogrn);
        this.SetInputValue(this.CompanyInfoModel.Inn, legalInfo.offical_inn);

        this.SetInputValue(this.ContactInfoModel.CeoFullName, contactInfo.ceo_full_name);
        this.SetInputValue(this.ContactInfoModel.CompanyEmail, contactInfo.company_email);
        this.SetInputValue(this.ContactInfoModel.CompanyPhone, contactInfo.company_phone);

        this.SetInputValue(this.FinanceInfoModel.BankRs, bankInfo.bank_rs);
        this.SetInputValue(this.FinanceInfoModel.BankKs, bankInfo.bank_ks);
        this.SetInputValue(this.FinanceInfoModel.Bik, bankInfo.bik);
        this.SetInputValue(this.FinanceInfoModel.BankName, bankInfo.bank_name);

        this.HasLoadedForm = true;
        this.$forceUpdate();
    }

    private mounted(): void {
        if (this.GetCurrentCompanyItem == undefined) {
            return;
        }

        document.title = "Редактирование компании...";
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

            await ApiCompany.UpdateCompanyNameFromSession(ApiEnter.CurrentSessionUUID, this.CurrentCompanyUUID, this.CompanyInfoModel.Name.value);
            ApiCompany.UpdateCompanyLegalInfoFromSession(ApiEnter.CurrentSessionUUID, this.CurrentCompanyUUID, this.CompanyInfoModel.OfficalAddress.value, this.CompanyInfoModel.OfficalName.value, this.CompanyInfoModel.Address.value);
            ApiCompany.UpdateCompanyContactInfoFromSession(ApiEnter.CurrentSessionUUID, this.CurrentCompanyUUID, this.ContactInfoModel.CeoFullName.value, this.ContactInfoModel.CompanyEmail.value, this.ContactInfoModel.CompanyPhone.value);
            ApiCompany.UpdateCompanyBankInfoFromSession(ApiEnter.CurrentSessionUUID, this.CurrentCompanyUUID, this.FinanceInfoModel.BankRs.value, this.FinanceInfoModel.Bik.value, this.FinanceInfoModel.BankKs.value, this.FinanceInfoModel.BankName.value);

            this.DoUpdateCurrentCompanyItem();
            this.DoUpdateCurrentCompanyList();

            this.HasRequest = false;
            this.$forceUpdate();

            sweetalert({
                title: "Успех!",
                text: `Изменения успешно внесены!`,
                icon: "success"
            }).then(() => {
                this.$router.push(`/company/dashboard/${this.CurrentCompanyUUID}`);
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

    private SetInputValue(model: any, line: string): void {
        model.value = line;
    }
}
</script>
