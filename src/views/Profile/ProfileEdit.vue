<template>
    <div class="page-container">
        <standart-template>
            <div class="container">
                <div class="row mt-1">
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                    <page-header title="Управление профилем"></page-header>
                </div>
                <div class="row mt-5">
                    <div class="col-2 left-tabs">
                        <div class="left-tabs__tab" v-for="item in LeftMenuItems" :key="'profile_left_menu_' + item.label" :class="{ 'left-tabs__tab--active': item.key == CurrentLeftMenuItem }" @click="OnClickLeftMenuItem(item)">
                            <div class="left-tabs__tab-icon">
                                <v-icon :color="item.key == CurrentLeftMenuItem ? 'white' : ''">
                                    {{ item.icon }}
                                </v-icon>
                            </div>
                            <div class="left-tabs__tab-text">{{ item.label }}</div>
                        </div>
                    </div>
                    <div class="col-10 row">
                        <div class="well">
                            <div class="well-wrapper">
                                <div class="row" v-if="CurrentLeftMenuItem == 'profile'">
                                    <div class="col-12">
                                        <h6 class="pb-1">Изменение личной информации</h6>
                                    </div>
                                    <div class="col-6">
                                        <v-form ref="ValidateFormsProfile">
                                            <div class="row">
                                                <div class="col-12">
                                                    <v-text-field label="Имя" v-model="FormModel.Name.value" required :counter="FormModel.Name.maxlength" :rules="FormModel.Name.rules"/>
                                                </div>
                                                <div class="col-12">
                                                    <v-text-field label="Фамилия" v-model="FormModel.SecondName.value" required :counter="FormModel.SecondName.maxlength" :rules="FormModel.SecondName.rules"/>
                                                </div>
                                                <div class="col-12">
                                                    <v-text-field label="Отчество" v-model="FormModel.LastName.value" required :counter="FormModel.LastName.maxlength" :rules="FormModel.LastName.rules"/>
                                                </div>
                                                <div class="col-12">
                                                    <v-text-field label="Телефон" type="tel" v-model="FormModel.Phone.value" required :counter="FormModel.Phone.maxlength" :rules="FormModel.Phone.rules"/>
                                                </div>
                                                <div class="col-12">
                                                    <v-text-field label="Дата рождения" v-model="FormModel.Birthday.value" required :rules="FormModel.Birthday.rules"/>
                                                </div>
                                                <div class="col-12">
                                                    <v-select label="Пол" :items="SelectSexList" v-model="FormModel.Sex.value" :rules="FormModel.Sex.rules" item-text="label" item-value="value"/>
                                                </div>
                                                <div class="col-12 mt-5">
                                                    <v-row align="center" justify="space-around">
                                                        <v-btn @click="OnClickChangeProfile" depressed :disabled="!ValidateFormsProfile" color="success">Сохранить изменения</v-btn>
                                                    </v-row>
                                                </div>
                                            </div>
                                        </v-form>
                                    </div>
                                </div>
                                <div class="row" v-if="CurrentLeftMenuItem == 'password'">
                                    <div class="col-12">
                                        <h6 class="pb-1">Изменение пароля</h6>
                                    </div>
                                    <div class="col-6">
                                        <v-form ref="ValidateFormsPassword">
                                            <div class="row">
                                                <div class="col-12">
                                                    <v-text-field label="Старый пароль" v-model="FormModel.OldPassword.value" type="password" required :counter="FormModel.OldPassword.maxlength" :rules="FormModel.OldPassword.rules"/>
                                                </div>
                                                <div class="col-12">
                                                    <v-text-field label="Новый пароль" v-model="FormModel.Password.value" type="password" required :counter="FormModel.Password.maxlength" :rules="FormModel.Password.rules"/>
                                                </div>
                                                <div class="col-12">
                                                    <v-text-field label="Повтор нового пароля" v-model="FormModel.PasswordRepeat.value" type="password" required :counter="FormModel.PasswordRepeat.maxlength" :rules="FormModel.PasswordRepeat.rules"/>
                                                </div>
                                                <div class="col-12 mt-5">
                                                    <v-row align="center" justify="space-around">
                                                        <v-btn depressed color="success" :disabled="!ValidateFormsPassword" @click="OnClickChangePassword">Изменить пароль</v-btn>
                                                    </v-row>
                                                </div>
                                            </div>
                                        </v-form>
                                    </div>
                                </div>
                                <div class="row" v-if="CurrentLeftMenuItem == 'email'">
                                    <h6 class="pb-1">Изменение Email</h6>
                                    <div class="col-6">
                                        <v-form ref="ValidateFormsEmail">
                                            <div class="row">
                                                <div class="col-12">
                                                    <v-text-field label="Email" v-model="FormModel.Email.value" type="email" required :counter="FormModel.Email.maxlength" :rules="FormModel.Email.rules"/>
                                                </div>
                                                <div class="col-12">
                                                    <v-text-field label="Повтор email" v-model="FormModel.EmailRepeat.value" type="email" required :counter="FormModel.EmailRepeat.maxlength" :rules="FormModel.EmailRepeat.rules"/>
                                                </div>
                                                <div class="col-12 mt-5">
                                                    <v-row align="center" justify="space-around">
                                                        <v-btn type="submit" :disabled="!ValidateFormsEmail" depressed color="success" @click="OnClickChangeEmail">Изменить Email</v-btn>
                                                    </v-row>
                                                </div>
                                            </div>
                                        </v-form>
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
import { Component, Vue, Ref } from "vue-property-decorator";
import { FormListInputModelType } from "@/struct/form/FormListInputModelType";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import LeftMenuItemType from "@/struct/ui/Menu/LeftMenuItemType";
import SexDataUiType from "@/struct/user/SexDataUiType";
import DataProfile from "@/data/Profile/DataProfile";
import DataUserEditProfilePage from "@/data/Profile/DataUserEditProfilePage";
import { Getter } from "vuex-class";
import PersonalUserItemType from "@/struct/user/PersonalUserItemType";
import sweetalert from "sweetalert";
import ApiProfile from "@/api/ApiProfile";
import ApiEnter from "@/api/ApiEnter";
import VFormType from "@/struct/form/VFormType";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class ProfileEdit extends Vue {

    @Ref("ValidateFormsPassword") private ValidateFormsPassword!: VFormType;
    @Ref("ValidateFormsProfile") private ValidateFormsProfile!: VFormType;
    @Ref("ValidateFormsEmail") private ValidateFormsEmail!: VFormType;
    @Getter("getCurrentSessionUser") private GetCurrentSessionUser!: PersonalUserItemType | undefined;


    private FormModel: FormListInputModelType = DataUserEditProfilePage.FormModel;
    private Breadcrumbs: BreadcrumbsItemType[] = DataUserEditProfilePage.Breadcrumbs;
    private LeftMenuItems: LeftMenuItemType[] = DataUserEditProfilePage.LeftMenuItems;
    private SelectSexList: SexDataUiType[] = DataProfile.SelectSexList;
    private CurrentLeftMenuItem: string = DataUserEditProfilePage.DefaultKeyFromLeftMenu;

    private created(): void {
        DataUserEditProfilePage.ClearFormModel();
        this.FormModel.Name.value = this.GetCurrentSessionUser?.first_name;
        this.FormModel.SecondName.value = this.GetCurrentSessionUser?.second_name;
        this.FormModel.LastName.value = this.GetCurrentSessionUser?.last_name;
        this.FormModel.Phone.value = this.GetCurrentSessionUser?.phone;
        this.FormModel.Birthday.value = this.GetCurrentSessionUser?.birthday;
        this.FormModel.Sex.value = this.GetCurrentSessionUser?.sex;
    }

    private OnClickLeftMenuItem(item: LeftMenuItemType): void {
        if (item.key == "delete") {
            this.OnClickDeleteFromLeftMenuItem();
        } else {
            this.CurrentLeftMenuItem = item.key;
        }
    }

    private OnClickDeleteFromLeftMenuItem(): void {


        sweetalert({
            title: "Вы уверены?",
            text: "Вы дейсвительно хотите удалить свой профиль?",
            icon: "warning",
            buttons: ["Нет, Отмена!", "Да, Подтверждаю!"],
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiProfile.deleteProfile(this.GetCurrentSessionUser?.user_uuid, this.GetCurrentSessionUser?.system_role, ApiEnter.CurrentSessionUUID as string);
                if (typeof response == "boolean") {
                    sweetalert({
                        title: "Успешно!",
                        text: "Профиль удален",
                        icon: "success",
                    });

                    this.$router.replace("/");
                } else {
                    sweetalert({
                        title: "Ошибка!",
                        text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                        icon: "error",
                    });
                }
            }
        });
    }

    private async OnClickChangePassword(): Promise<void> {
        const validate: boolean = this.ValidateFormsPassword.validate();

        if (!validate) {
            sweetalert({
                title: "Ошибка в форме!",
                text: "Вы заполнили не все поля или есть ошибки!",
                icon: "error"
            });
            return;
        }

        try {
            const response = await ApiProfile.passwordUpdate(this.FormModel.OldPassword.value, this.FormModel.Password.value, ApiEnter.CurrentSessionUUID as string);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Успешно!",
                    text: "Пароль успешно сменен",
                    icon: "success",
                });
            } else {
                sweetalert({
                    title: "Ошибка!",
                    text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                    icon: "error",
                });
            }
        } catch (e) {
            console.error(e);
            sweetalert({
                title: "Ошибка!",
                text: "Во время выполнения запроса, возникла ошибка!",
                icon: "error",
            });
        }
    }

    private async OnClickChangeEmail(): Promise<void> {
        const validate: boolean = this.ValidateFormsEmail.validate();
        if (!validate) {
            sweetalert({
                title: "Ошибка в форме!",
                text: "Вы заполнили не все поля или есть ошибки!",
                icon: "error"
            });
            return;
        }

        try {
            const response = await ApiProfile.emailUpdate(this.FormModel.Email.value, ApiEnter.CurrentSessionUUID as string);
            console.log("response", response);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Успешно!",
                    text: "Пароль успешно сменен",
                    icon: "success",
                });
            } else {
                sweetalert({
                    title: "Ошибка!",
                    text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                    icon: "error",
                });
            }
        } catch (e) {
            console.error(e);
            sweetalert({
                title: "Ошибка!",
                text: "Во время выполнения запроса, возникла ошибка!",
                icon: "error",
            });
        }
    }

    private async OnClickChangeProfile(): Promise<void> {
        const validate: boolean = this.ValidateFormsProfile.validate();
        if (!validate) {
            sweetalert({
                title: "Ошибка в форме!",
                text: "Вы заполнили не все поля или есть ошибки!",
                icon: "error"
            });
            return;
        }

        try {
            const response = await ApiProfile.profileUpdate(this.FormModel.Name.value, this.FormModel.SecondName.value, this.FormModel.LastName.value, this.FormModel.Phone.value, this.FormModel.Birthday.value, this.FormModel.Sex.value, ApiEnter.CurrentSessionUUID as string);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Успешно!",
                    text: "Профиль поменян",
                    icon: "success",
                });
            } else {
                sweetalert({
                    title: "Ошибка!",
                    text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                    icon: "error",
                });
            }
        } catch (e) {
            sweetalert({
                title: "Ошибка!",
                text: "Во время выполнения запроса, возникла ошибка",
                icon: "error",
            });
        }
    }
}
</script>
