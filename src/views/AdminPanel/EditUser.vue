<template>
    <div class="page-container">
        <standart-template>
            <div class="container">
                <div class="row mt-1">
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                    <page-header title="Редактирование профиля"></page-header>
                </div>
                <div class="row mt-5">
                    <div class="col-2 left-menu">
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
                                    <div class="col-6">
                                        <form-generator ref="validate-user-info" title="Изменение личной информации" :form-model="UserInfoModel"/>
                                        <v-btn @click="OnClickChangeProfile" depressed color="success">Сохранить изменения
                                        </v-btn>
                                    </div>

                                </div>
                                <div class="row" v-if="CurrentLeftMenuItem == 'password'">
                                    <div class="col-6">
                                        <form-generator ref="validate-password" title="Изменение пароля" :form-model="UserPasswordModel"/>
                                        <v-btn depressed color="success" @click="OnClickChangePassword">Изменить пароль</v-btn>
                                    </div>
                                </div>
                                <div class="row" v-if="CurrentLeftMenuItem == 'email'">
                                    <div class="col-6">
                                        <form-generator ref="validate-email" title="Изменение Email" :form-model="UserEmailModel"/>
                                        <v-btn type="submit" depressed color="success" @click="OnClickChangeEmail">Изменить
                                            Email
                                        </v-btn>
                                    </div>
                                </div>
                                <div class="row" v-if="CurrentLeftMenuItem == 'change-status'">
                                    <div class="col-6">
                                        <form-generator title="Изменение статуса" :form-model="UserChangeStatus"/>
                                        <v-btn type="submit" depressed color="success" @click="OnClickChangeStatus">Изменить
                                            статус
                                        </v-btn>
                                    </div>
                                </div>
                                <div class="row" v-if="CurrentLeftMenuItem == 'change-role'">
                                    <div class="col-6">
                                        <form-generator title="Изменение роли" :form-model="UserChangeRole"/>
                                        <v-btn type="submit" depressed color="success" @click="OnClickChangeRole">Изменить
                                            роль
                                        </v-btn>
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
import { Getter } from "vuex-class";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import LeftMenuItemType from "@/struct/ui/Menu/LeftMenuItemType";
import PersonalUserItemType from "@/struct/user/PersonalUserItemType";
import sweetalert from "sweetalert";
import ApiEnter from "@/api/ApiEnter";
import DataEditUser from "@/data/AdminPanel/DataEditUser";
import ApiAdmin from "@/api/ApiAdmin";
import FormGenerator from "@/components/UI/Form/FormGenerator.vue";
import { FormGeneratorListInputModelType } from "@/struct/form/FormGenerator/FormGeneratorListInputModelType";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import PageHeader from "@/components/UI/PageHeader.vue";


@Component({
    components: { PageHeader, StandartTemplate, FormGenerator }
})

export default class ProfileEdit extends Vue {
    @Getter("getCurrentSessionUser") private GetCurrentSessionUser!: PersonalUserItemType | undefined;


    private Breadcrumbs: BreadcrumbsItemType[] = DataEditUser.Breadcrumbs;
    private LeftMenuItems: LeftMenuItemType[] = DataEditUser.LeftMenuItems;
    private CurrentLeftMenuItem: string = DataEditUser.DefaultKeyFromLeftMenu;

    private UserData!: PersonalUserItemType | any; // TODO исправить


    @Ref("validate-user-info") private UserFormGenerator!: FormGenerator;
    private UserInfoModel: FormGeneratorListInputModelType = DataEditUser.FormUserData;
    @Ref("validate-password") private UserPasswordGenerator!: FormGenerator;
    private UserPasswordModel: FormGeneratorListInputModelType = DataEditUser.FormUserPassword;
    @Ref("validate-email") private UserEmailGenerator!: FormGenerator;
    private UserEmailModel: FormGeneratorListInputModelType = DataEditUser.FormUserEmail;

    private UserChangeStatus: FormGeneratorListInputModelType = DataEditUser.FormChangeStatus;
    private UserChangeRole: FormGeneratorListInputModelType = DataEditUser.FormChangeRole;

    private CurrentUserUUID!: string;

    private async LoadUserData(): Promise<void> {
        this.CurrentUserUUID = this.$route.params.user_uuid;
        this.UserData = await ApiAdmin.GetUser(ApiEnter.CurrentSessionUUID as string, this.CurrentUserUUID);
        this.UserInfoModel.Name.value = this.UserData.first_name;
        this.UserInfoModel.SecondName.value = this.UserData.second_name;
        this.UserInfoModel.LastName.value = this.UserData.last_name;
        this.UserInfoModel.Phone.value = this.UserData.phone;
        this.UserInfoModel.Birthday.value = this.UserData.birthday;
        this.UserInfoModel.Sex.value = this.UserData.sex;
        this.UserEmailModel.Email.value = this.UserData.email;
        this.UserChangeStatus.Status.value = this.UserData.status;
        this.UserChangeRole.Role.value = this.UserData.system_role;
    }


    private created(): void {
        DataEditUser.ClearFormModel();
        this.LoadUserData();
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
            buttons: ["Нет, Отмена!", "Да, Подтверждаю!"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiAdmin.DeleteUser(ApiEnter.CurrentSessionUUID as string, this.CurrentUserUUID);
                if (typeof response == "boolean") {
                    sweetalert({
                        title: "Успешно!",
                        text: "Профиль удален",
                        icon: "success"
                    });

                    this.$router.replace("/");
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

    private async OnClickChangePassword(): Promise<void> {
        const validate: boolean = this.UserPasswordGenerator.CurrentForm.validate();

        if (!validate) {
            sweetalert({
                title: "Ошибка в форме!",
                text: "Вы заполнили не все поля или есть ошибки!",
                icon: "error"
            });
            return;
        }

        try {
            const response = await ApiAdmin.UpdatePassword(this.UserPasswordModel.Password.value as string, this.CurrentUserUUID, ApiEnter.CurrentSessionUUID as string);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Успешно!",
                    text: "Пароль успешно сменен",
                    icon: "success"
                });
            } else {
                sweetalert({
                    title: "Ошибка!",
                    text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            sweetalert({
                title: "Ошибка!",
                text: "Во время выполнения запроса, возникла ошибка!",
                icon: "error"
            });
        }
    }

    private async OnClickChangeEmail(): Promise<void> {
        const validate: boolean = this.UserEmailGenerator.CurrentForm.validate();
        if (!validate) {
            sweetalert({
                title: "Ошибка в форме!",
                text: "Вы заполнили не все поля или есть ошибки!",
                icon: "error"
            });
            return;
        }

        try {
            const response = await ApiAdmin.UpdateEmail(this.UserEmailModel.Email.value as string, this.CurrentUserUUID, ApiEnter.CurrentSessionUUID as string);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Успешно!",
                    text: "Email успешно сменен",
                    icon: "success"
                });
            } else {
                sweetalert({
                    title: "Ошибка!",
                    text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            sweetalert({
                title: "Ошибка!",
                text: "Во время выполнения запроса, возникла ошибка!",
                icon: "error"
            });
        }
    }

    private async OnClickChangeRole(): Promise<void> {
        try {
            const response = await ApiAdmin.UpdateUserRole(this.CurrentUserUUID, ApiEnter.CurrentSessionUUID as string, this.UserChangeRole.Role.value as string);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Успешно!",
                    text: "Роль успешно поменяна",
                    icon: "success"
                });
            } else {
                sweetalert({
                    title: "Ошибка!",
                    text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            sweetalert({
                title: "Ошибка!",
                text: "Во время выполнения запроса, возникла ошибка!",
                icon: "error"
            });
        }
    }

    private async OnClickChangeStatus(): Promise<void> {
        try {
            const response = await ApiAdmin.UpdateUserStatus(this.CurrentUserUUID, ApiEnter.CurrentSessionUUID as string, this.UserChangeStatus.Status.value as string);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Успешно!",
                    text: "Статус успешно поменян",
                    icon: "success"
                });
            } else {
                sweetalert({
                    title: "Ошибка!",
                    text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
            sweetalert({
                title: "Ошибка!",
                text: "Во время выполнения запроса, возникла ошибка!",
                icon: "error"
            });
        }
    }

    private async OnClickChangeProfile(): Promise<void> {
        const validate: boolean = this.UserFormGenerator.CurrentForm.validate();
        if (!validate) {
            sweetalert({
                title: "Ошибка в форме!",
                text: "Вы заполнили не все поля или есть ошибки!",
                icon: "error"
            });
            return;
        }

        try {
            const response = await ApiAdmin.UpdateUserData(this.UserInfoModel.Name.value, this.UserInfoModel.SecondName.value, this.UserInfoModel.LastName.value, this.UserInfoModel.Phone.value, this.UserInfoModel.Birthday.value, this.UserInfoModel.Sex.value as any, ApiEnter.CurrentSessionUUID as string, this.CurrentUserUUID);
            if (typeof response == "boolean") {
                sweetalert({
                    title: "Успешно!",
                    text: "Профиль поменян",
                    icon: "success"
                });
            } else {
                sweetalert({
                    title: "Ошибка!",
                    text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                    icon: "error"
                });
            }
        } catch (e) {
            sweetalert({
                title: "Ошибка!",
                text: "Во время выполнения запроса, возникла ошибка",
                icon: "error"
            });
        }
    }
}
</script>
