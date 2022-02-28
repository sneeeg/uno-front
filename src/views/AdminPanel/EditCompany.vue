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
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                    <page-header title="Редактирование компании"></page-header>
                </div>
                <div class="row mt-5">
                    <div class="col-2 left-tabs">
                        <div class="left-tabs__tab" v-for="item in LeftMenuItems" :key="'profile_left_menu_' + item.label" :class="{ 'left-tabs__tab--active': item.key == CurrentLeftMenuItem }" @click="OnClickLeftMenuItem(item)">
                            <div class="left-tabs__tab-icon">
                                <v-icon
                                    :color="item.key == CurrentLeftMenuItem ? 'white' : ''"
                                >
                                    {{ item.icon }}
                                </v-icon>
                            </div>

                            <div class="left-tabs__tab-text">{{ item.label }}</div>
                        </div>
                    </div>
                    <div class="col-10 row">
                        <div class="well">
                            <div class="well-wrapper">
                                <div class="row" v-if="CurrentLeftMenuItem == 'company-info'">
                                    <div class="col-6">
                                        <form-generator ref="company-form-generator" title="Данные о компании"
                                                        :form-model="CompanyInfoModel"/>
                                        <v-btn class="mt-2" color="success" :loading="HasRequest" :disabled="HasRequest" @click="OnClickSubmitCompanyInfo">Сохранить</v-btn>
                                    </div>
                                </div>
                                <div class="row" v-if="CurrentLeftMenuItem == 'contact-info'">
                                    <div class="col-6">
                                        <form-generator ref="contact-form-generator" title="Контактная информация"
                                                        :form-model="ContactInfoModel"/>
                                        <v-btn class="mt-2" @click="OnClickSubmitContactInfo" :loading="HasRequest" :disabled="HasRequest" color="success">Сохранить</v-btn>

                                    </div>
                                </div>
                                <div class="row" v-if="CurrentLeftMenuItem == 'finance-info'">
                                    <div class="col-6">
                                        <form-generator ref="finance-form-generator" title="Финансовая информация"
                                                        :form-model="FinanceInfoModel"/>
                                        <v-btn class="mt-2" color="success" @click="OnClickSubmitFinanceInfo" :loading="HasRequest" :disabled="HasRequest">Сохранить</v-btn>
                                    </div>
                                </div>
                                <div class="row" v-if="CurrentLeftMenuItem == 'change-status'">
                                    <div class="col-6">
                                        <form-generator ref="finance-form-generator" title="Изменения статуса"
                                                        :form-model="StatusInfoModel"/>
                                        <v-btn class="mt-2" color="success" @click="OnClickSubmitStatus" :loading="HasRequest" :disabled="HasRequest">Сохранить</v-btn>
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
import ApiEnter from "@/api/ApiEnter";
import { Getter, Mutation } from "vuex-class";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import PageHeader from "@/components/UI/PageHeader.vue";
import FormGenerator from "@/components/UI/Form/FormGenerator.vue";
import { FormGeneratorListInputModelType } from "@/struct/form/FormGenerator/FormGeneratorListInputModelType";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuItemType from "@/struct/ui/Menu/LeftMenuItemType";
import DataEditCompany from "@/data/AdminPanel/DataEditCompany";
import ApiAdmin from "@/api/ApiAdmin";
import ApiProfile from "@/api/ApiProfile";
import PersonalUserItemType from "@/struct/user/PersonalUserItemType";

@Component({
    components: { StandartTemplate, PageHeader, FormGenerator }
})
export default class CompanyEdit extends Vue {

    @Getter("getCurrentCompanyItem") private GetCurrentCompanyItem!: CompanyTableRowType | undefined;


    @Mutation("setCurrentCompanyItem") private SetCurrentCompanyItem!: (payload: CompanyTableRowType | null) => void;

    private Breadcrumbs!: BreadcrumbsItemType[];
    @Ref("company-form-generator") private CompanyFormGenerator!: FormGenerator;
    private CompanyInfoModel: FormGeneratorListInputModelType = DataEditCompany.CompanyInfoModel;
    @Ref("contact-form-generator") private ContactFormGenerator!: FormGenerator;
    private ContactInfoModel: FormGeneratorListInputModelType = DataEditCompany.ContactInfoModel;
    @Ref("finance-form-generator") private FinanceFormGenerator!: FormGenerator;
    private FinanceInfoModel: FormGeneratorListInputModelType = DataEditCompany.FinanceInfoModel;
    private StatusInfoModel: FormGeneratorListInputModelType = DataEditCompany.ChangeStatusInfoModel;

    private LeftMenuItems: LeftMenuItemType[] = DataEditCompany.LeftMenuItems;

    private CurrentLeftMenuItem: string = DataEditCompany.DefaultKeyFromLeftMenu;


    private HasLoadedForm!: boolean;
    private HasRequest!: boolean;
    private CurrentCompanyUUID!: string;

    private created() {
        this.Breadcrumbs = DataEditCompany.Breadcrumbs;
        this.HasLoadedForm = false;
        this.HasRequest = false;

        this.CurrentCompanyUUID = this.$route.params.company_uuid;
        this.DoLoadForm();
    }

    private async DoLoadForm(): Promise<void> {

        const companyInfo: any = await ApiAdmin.GetCompanyByUUID(ApiEnter.CurrentSessionUUID as string, this.CurrentCompanyUUID);
        if (companyInfo == undefined) {
            sweetalert({
                title: "Упс!",
                text: "Во время загрузки информации - возникла ошибка, не все данные были заружены!",
                icon: "error"
            }).then(() => {
                this.$router.go(-1);
            });
            return;
        }

        this.SetInputValue(this.CompanyInfoModel.Name, this.GetCurrentCompanyItem?.name as string);

        this.SetInputValue(this.CompanyInfoModel.Address, companyInfo.address);
        this.SetInputValue(this.CompanyInfoModel.OfficalAddress, companyInfo.offical_addres);
        this.SetInputValue(this.CompanyInfoModel.OfficalName, companyInfo.offical_name);
        this.SetInputValue(this.CompanyInfoModel.Ogrn, companyInfo.offical_ogrn);
        this.SetInputValue(this.CompanyInfoModel.Inn, companyInfo.offical_inn);

        this.SetInputValue(this.ContactInfoModel.CeoFullName, companyInfo.ceo_full_name);
        this.SetInputValue(this.ContactInfoModel.CompanyEmail, companyInfo.company_email);
        this.SetInputValue(this.ContactInfoModel.CompanyPhone, companyInfo.company_phone);

        this.SetInputValue(this.FinanceInfoModel.BankRs, companyInfo.bank_rs);
        this.SetInputValue(this.FinanceInfoModel.BankKs, companyInfo.bank_ks);
        this.SetInputValue(this.FinanceInfoModel.Bik, companyInfo.bik);
        this.SetInputValue(this.FinanceInfoModel.BankName, companyInfo.bank_name);

        this.SetInputValue(this.StatusInfoModel.Status, companyInfo.status);

        this.HasLoadedForm = true;
        this.$forceUpdate();
    }

    private mounted(): void {
        if (this.GetCurrentCompanyItem == undefined) {
            return;
        }


        document.title = "Редактирование компании...";
    }

    private async OnClickSubmitCompanyInfo(): Promise<void> {
        const validate = this.CompanyFormGenerator.CurrentForm.validate();

        if (!validate) {
            sweetalert({
                title: "Ошибка в форме!",
                text: "Вы заполнили не все поля или есть ошибки!",
                icon: "error"
            });
            return;
        }

        this.HasRequest = true;
        const response = await ApiAdmin.UpdateCompanyInfo(ApiEnter.CurrentSessionUUID as string, this.CurrentCompanyUUID, this.CompanyInfoModel.OfficalName.value, this.CompanyInfoModel.Inn.value, this.CompanyInfoModel.Ogrn.value, this.CompanyInfoModel.OfficalAddress.value, this.CompanyInfoModel.Address.value);
        if (typeof response == "boolean") {
            sweetalert({
                title: "Успех!",
                text: `Изменения успешно внесены!`,
                icon: "success"
            });
        } else {
            sweetalert({
                title: "Ошибка!",
                text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                icon: "error"
            });
        }
        this.HasRequest = false;
    }

    private async OnClickSubmitContactInfo(): Promise<void> {
        const validate = this.ContactFormGenerator.CurrentForm.validate();

        if (!validate) {
            sweetalert({
                title: "Ошибка в форме!",
                text: "Вы заполнили не все поля или есть ошибки!",
                icon: "error"
            });
            return;
        }
        this.HasRequest = true;
        const response = await ApiAdmin.UpdateContactInfo(ApiEnter.CurrentSessionUUID as string, this.CurrentCompanyUUID, this.ContactInfoModel.CeoFullName.value, this.ContactInfoModel.CompanyEmail.value, this.ContactInfoModel.CompanyPhone.value);
        if (typeof response == "boolean") {
            sweetalert({
                title: "Успех!",
                text: `Изменения успешно внесены!`,
                icon: "success"
            });
        } else {
            sweetalert({
                title: "Ошибка!",
                text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                icon: "error"
            });
        }
        this.HasRequest = false;
    }

    private async OnClickSubmitFinanceInfo(): Promise<void> {
        const validate = this.FinanceFormGenerator.CurrentForm.validate();

        if (!validate) {
            sweetalert({
                title: "Ошибка в форме!",
                text: "Вы заполнили не все поля или есть ошибки!",
                icon: "error"
            });
            return;
        }
        this.HasRequest = true;
        const response = await ApiAdmin.UpdateFinanceInfo(ApiEnter.CurrentSessionUUID as string, this.CurrentCompanyUUID, this.FinanceInfoModel.BankRs.value, this.FinanceInfoModel.Bik.value, this.FinanceInfoModel.BankKs.value, this.FinanceInfoModel.BankName.value);
        if (typeof response == "boolean") {
            sweetalert({
                title: "Успех!",
                text: `Изменения успешно внесены!`,
                icon: "success"
            });
        } else {
            sweetalert({
                title: "Ошибка!",
                text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                icon: "error"
            });
        }
        this.HasRequest = false;
    }

    private async OnClickSubmitStatus(): Promise<void> {
        this.HasRequest = true;
        const response = await ApiAdmin.UpdateCompanyStatus(ApiEnter.CurrentSessionUUID as string, this.CurrentCompanyUUID, this.StatusInfoModel.Status.value as string);
        if (typeof response == "boolean") {
            sweetalert({
                title: "Успех!",
                text: `Изменения успешно внесены!`,
                icon: "success"
            });
        } else {
            sweetalert({
                title: "Ошибка!",
                text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                icon: "error"
            });
        }
        this.HasRequest = false;
    }

    private SetInputValue(model: any, line: string): void {
        model.value = line;
    }

    private OnClickLeftMenuItem(item: LeftMenuItemType): void {
        if (item.key == "delete") {
            return this.OnClickDeleteFromLeftMenuItem();
        }

        if (item.key == "change-owner") {
            return this.OnClickChangeOwner();
        }

        this.CurrentLeftMenuItem = item.key;
    }

    private OnClickDeleteFromLeftMenuItem(): void {
        sweetalert({
            title: "Вы уверены?",
            text: "Вы дейсвительно хотите удалить свой профиль?",
            icon: "warning",
            buttons: ["Нет, Отмена!", "Да, Подтверждаю!"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiAdmin.DeleteCompany(ApiEnter.CurrentSessionUUID as string, this.CurrentCompanyUUID);
                if (typeof response == "boolean") {
                    sweetalert({
                        title: "Успешно!",
                        text: "Компания удалена",
                        icon: "success"
                    });

                    this.$router.replace("/admin/companies");
                } else {
                    sweetalert({
                        title: "Ошибка!",
                        text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                        icon: "error"
                    });
                }
            }
        });
    }

    private OnClickChangeOwner(): void {
        sweetalert({
            title: "Добавление сотрудника",
            text: "Введите Email нового сотрудника:",
            content: {
                element: "input",
                attributes: {
                    placeholder: "Пример: vasya@mail.ru",
                    type: "email"
                }
            }
        }).then(async (result: string | null) => {
            if (result == null) {
                return;
            }
            if (result.trim().length == 0) {
                sweetalert({
                    title: "Ошибка!",
                    text: "Вы не чего не ввели, сотрудник не добавлен!",
                    icon: "error"
                });
                return;
            }
            if (!result.match(/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                sweetalert({
                    title: "Ошибка!",
                    text: "Вы ввели не корректный Email!",
                    icon: "error"
                });
                return;
            }

            const user: PersonalUserItemType | undefined = await ApiProfile.GetUserFromEmail(ApiEnter.CurrentSessionUUID as string, result);
            if (user !== undefined) {

                const response: boolean | undefined = await ApiAdmin.UpdateCompanyOwner(ApiEnter.CurrentSessionUUID as string, this.CurrentCompanyUUID, user.user_uuid);

                if (typeof response == "boolean") {
                    sweetalert({
                        title: "Успех!",
                        text: `Изменения успешно внесены!`,
                        icon: "success"
                    });
                } else {
                    sweetalert({
                        title: "Ошибка!",
                        text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                        icon: "error"
                    });
                }

            } else {
                sweetalert({
                    title: "Ошибка!",
                    text: "Во время запроса, возникла ошибка: " + user,
                    icon: "error"
                });
            }
        });
    }
}
</script>
