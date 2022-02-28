<template>
    <div class="page-container company-employee-list-page">
        <standart-template>
            <div class="container">
                <div class="row mt-1" v-if="GetCurrentCompanyItem != undefined && CurrentEmployeeList != undefined">
                    <v-breadcrumbs :items="Breadcrumbs" divider="/" v-if="Breadcrumbs"></v-breadcrumbs>
                    <page-header :title="'Сотрудники компании: ' + GetCurrentCompanyItem.name" :back-url="'/company/dashboard/' + GetCurrentCompanyItem.uuid">
                        <router-link to="#" @click.prevent="OnClickCreateEmployee()">
                            <v-btn small tile color="success">
                                <v-icon left>
                                    fas fa-plus
                                </v-icon>
                                <span class="tool-text">
                                    Добавить нового сотрудника
                                </span>
                            </v-btn>
                        </router-link>
                    </page-header>

                    <div class="col-4 mt-4" v-for="(item) in CurrentEmployeeList" :key="item.uuid">
                        <div class="card-control company-item card-employee">
                            <div class="badge-items">
                                <div :class="'badge-item ' + GetClassBadgeFromEmployeeStatus(item)">
                                    {{ GetTextBadgeFromEmployeeStatus(item) }}
                                </div>
                            </div>
                            <div class="icon">
                                <i class="fas fa-user-tie"></i>
                            </div>
                            <div class="first-name">{{ item.last_name }} {{ item.first_name }}</div>
                            <div class="so-name">{{ item.email }} - <span :class="'badge bg-' + GetClassBadgeFromEmployeeUserStatus(item)">{{ GetTextBadgeFromEmployeeUserStatus(item) }}</span></div>
                            <div class="controls row mt-2">
                                <div class="control col">
                                    <div class="btn-group" v-if="EmployeeRoleHasLock(item) == false">
                                        <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            {{ GetTextFromEmployeeStatus(item) }}
                                        </span>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#" @click.prevent="SetEmployeeStatus(item, 1)">Активный</a></li>
                                            <li><a class="dropdown-item" href="#" @click.prevent="SetEmployeeStatus(item, 0)">Отключенный</a></li>
                                        </ul>
                                    </div>
                                    <span v-else>{{ GetTextFromEmployeeStatus(item) }}</span>
                                </div>
                                <div class="control col">
                                    <span v-if="EmployeeRoleHasLock(item)">
                                        {{ GetTextFromEmployeeRole(item) }}
                                    </span>
                                    <div class="btn-group" v-else>
                                        <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            {{ GetTextFromEmployeeRole(item) }}
                                        </span>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#" @click.prevent="SetEmployeeRole(item, 0)">Водитель</a></li>
                                            <li><a class="dropdown-item" href="#" @click.prevent="SetEmployeeRole(item, 1)">Менеджер</a></li>
                                            <li><a class="dropdown-item" href="#" @click.prevent="SetEmployeeRole(item, 2)">Бухгалтер</a></li>
                                            <li><a class="dropdown-item" href="#" @click.prevent="SetEmployeeRole(item, 3)">Администратор</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="control col" v-if="EmployeeRoleHasLock(item) == false">
                                    <span @click="DeleteEmployee(item)">Удалить</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3" v-else>
                    <div class="col-8 offset-2">
                        <v-progress-linear indeterminate color="cyan"></v-progress-linear>
                    </div>
                </div>
            </div>
        </standart-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";
import ApiCompanyEmployee from "@/api/ApiCompanyEmployee";
import ApiEnter from "@/api/ApiEnter";
import ApiCompany from "@/api/ApiCompany";
import CompanyEmployeeExRowType from "@/struct/company/CompanyEmployeeExRowType";
import EUserEnum from "@/struct/user/EUserEnum";
import ECompanyEmployeeEnum from "@/struct/company/ECompanyEmployeeEnum";
import sweetalert from "sweetalert";
import CompanyEmployeeRole = ECompanyEmployeeEnum.CompanyEmployeeRole;
import CompanyEmployeeStatus = ECompanyEmployeeEnum.CompanyEmployeeStatus;
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import PersonalUserItemType from "@/struct/user/PersonalUserItemType";
import PageHeader from "@/components/UI/PageHeader.vue";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";

@Component({
    components: { StandartTemplate, PageHeader },
    watch: {
        "GetCurrentCompanyItem": "OnGetCurrentCompanyItemChanged"
    }
})
export default class CompanyEmployeeList extends Vue {
    @Getter("getCurrentCompanyItem") private GetCurrentCompanyItem!: CompanyTableRowType | undefined;
    @Getter("getCurrentSessionUser") private GetCurrentSessionUser!: PersonalUserItemType;

    private Breadcrumbs?: BreadcrumbsItemType[];
    private CurrentEmployeeList!: CompanyEmployeeExRowType[] | undefined;

    private created() {
        this.CurrentEmployeeList = undefined;
        this.Breadcrumbs = undefined;
        this.LoadTable();

        // Вызываем на случай - если был переход, и изменения GetCurrentCompanyItem не происходит.
        this.OnGetCurrentCompanyItemChanged();
    }

    private async LoadTable() {
        this.CurrentEmployeeList = await ApiCompanyEmployee.GetEmployeeListFromSessionUUID(ApiEnter.CurrentSessionUUID as string, ApiCompany.CurrentCompanyUUID as string);
        this.$forceUpdate();
    }

    private OnGetCurrentCompanyItemChanged(): void {
        if (this.Breadcrumbs == undefined) {
            this.Breadcrumbs = [
                {
                    to: "/",
                    text: "Главная"
                },
                {
                    to: "/company/list",
                    text: "Компании"
                },
                {
                    to: "/company/dashboard/" + this.$route.params.company_uuid,
                    text: "..."
                },
                {
                    disabled: true,
                    to: "/company/employee/list/" + this.$route.params.company_uuid,
                    text: "Управление сотрудниками"
                }
            ];
            this.Breadcrumbs[2].text = "(" + this.GetCurrentCompanyItem?.id + ") " + this.GetCurrentCompanyItem?.name;
        }
    }

    private mounted(): void {
        document.title = "Сотрудники компании: " + this.GetCurrentCompanyItem?.name;
    }

    private GetClassBadgeFromEmployeeUserStatus(employee: CompanyEmployeeExRowType): string {
        switch (employee.user_status) {
            case EUserEnum.UserStatus.Active:
                return "success";
            case EUserEnum.UserStatus.Created:
                return "info text-dark";
            case EUserEnum.UserStatus.Banned:
                return "danger";
            case EUserEnum.UserStatus.Deleted:
                return "dark";
            case EUserEnum.UserStatus.NoActive:
                return "warning text-dark";
        }
        return "primary";
    }

    private GetTextBadgeFromEmployeeStatus(employee: CompanyEmployeeExRowType): string {
        switch (employee.status) {
            case ECompanyEmployeeEnum.CompanyEmployeeStatus.Active:
                return "Активен";
            case ECompanyEmployeeEnum.CompanyEmployeeStatus.NoActive:
                return "Отключен";
            case ECompanyEmployeeEnum.CompanyEmployeeStatus.Dismissed:
                return "Уволен";
            case ECompanyEmployeeEnum.CompanyEmployeeStatus.Deleted:
                return "Удален";
        }
        return "info";
    }

    private GetClassBadgeFromEmployeeStatus(employee: CompanyEmployeeExRowType): string {
        switch (employee.status) {
            case ECompanyEmployeeEnum.CompanyEmployeeStatus.Active:
                return "success";
            case ECompanyEmployeeEnum.CompanyEmployeeStatus.NoActive:
                return "warning";
            case ECompanyEmployeeEnum.CompanyEmployeeStatus.Dismissed:
                return "danger";
            case ECompanyEmployeeEnum.CompanyEmployeeStatus.Deleted:
                return "info";
        }
        return "info";
    }

    private SetEmployeeRole(employee: CompanyEmployeeExRowType, role: ECompanyEmployeeEnum.CompanyEmployeeRole): void {
        sweetalert({
            title: "Вы уверены?",
            text: "Вы дейсвительно хотите установить роль: " + ECompanyEmployeeEnum.CompanyEmployeeRole[role],
            icon: "warning",
            buttons: [
                "Нет, Отмена!",
                "Да, Подтверждаю!"
            ]
        }).then(async (isConfirm) => {
            if (isConfirm) {
                try {
                    await ApiCompanyEmployee.SetEmployeeRoleFromSessionUUID(ApiEnter.CurrentSessionUUID as string, ApiCompany.CurrentCompanyUUID as string, employee.uuid, role);
                    await this.LoadTable();
                } catch (e) {
                    console.error(e);
                    sweetalert({
                        title: "Ошибка!",
                        text: "Во время выполнения запроса, возникла ошибка!",
                        icon: "error"
                    });
                }
            }
        });
    }

    private SetEmployeeStatus(employee: CompanyEmployeeExRowType, status: ECompanyEmployeeEnum.CompanyEmployeeStatus): void {
        sweetalert({
            title: "Вы уверены?",
            text: "Вы дейсвительно хотите установить статус: " + ECompanyEmployeeEnum.CompanyEmployeeStatus[status],
            icon: "warning",
            buttons: [
                "Нет, Отмена!",
                "Да, Подтверждаю!"
            ]
        }).then(async (isConfirm) => {
            if (isConfirm) {
                try {
                    await ApiCompanyEmployee.SetEmployeeStatusFromSessionUUID(ApiEnter.CurrentSessionUUID as string, ApiCompany.CurrentCompanyUUID as string, employee.uuid, status);
                    await this.LoadTable();
                } catch (e) {
                    console.error(e);
                    sweetalert({
                        title: "Ошибка!",
                        text: "Во время выполнения запроса, возникла ошибка!",
                        icon: "error"
                    });
                }
            }
        });
    }

    private DeleteEmployee(employee: CompanyEmployeeExRowType): void {
        sweetalert({
            title: "Вы уверены?",
            text: "Вы дейсвительно хотите удалить сотрудника?",
            icon: "warning",
            buttons: [
                "Нет, Отмена!",
                "Да, Подтверждаю!"
            ]
        }).then(async (isConfirm) => {
            if (isConfirm) {
                try {
                    await ApiCompanyEmployee.DeleteEmployeeFromSessionUUID(ApiEnter.CurrentSessionUUID as string, ApiCompany.CurrentCompanyUUID as string, employee.uuid);
                    await this.LoadTable();
                } catch (e) {
                    console.error(e);
                    sweetalert({
                        title: "Ошибка!",
                        text: "Во время выполнения запроса, возникла ошибка!",
                        icon: "error"
                    });
                }
            }
        });
    }

    private GetTextBadgeFromEmployeeUserStatus(employee: CompanyEmployeeExRowType): string {
        return EUserEnum.UserStatus[employee.user_status];
    }

    private EmployeeRoleHasLock(employee: CompanyEmployeeExRowType): boolean {
        if (employee.role == CompanyEmployeeRole.Owner) {
            return true;
        }
        if (employee.user_uuid == this.GetCurrentSessionUser.user_uuid) {
            return true;
        }
        return false;
    }

    private GetTextFromEmployeeRole(employee: CompanyEmployeeExRowType): string {

        switch (employee.role) {
            case ECompanyEmployeeEnum.CompanyEmployeeRole.Owner:
                return "Владелец";
            case ECompanyEmployeeEnum.CompanyEmployeeRole.Admin:
                return "Админ";
            case ECompanyEmployeeEnum.CompanyEmployeeRole.Driver:
                return "Водитель";
            case ECompanyEmployeeEnum.CompanyEmployeeRole.Manager:
                return "Менеджер";
            case ECompanyEmployeeEnum.CompanyEmployeeRole.Accountant:
                return "Бухгалтер";
        }
        return "Не Известно";
    }

    private GetTextFromEmployeeStatus(employee: CompanyEmployeeExRowType): string {
        switch (employee.status) {
            case CompanyEmployeeStatus.Active:
                return "Активный";
            case CompanyEmployeeStatus.Deleted:
                return "Удаленный";
            case CompanyEmployeeStatus.NoActive:
                return "Отключенный";
            case CompanyEmployeeStatus.Dismissed:
                return "Уволенный";
        }
        return "Не Известно";
    }

    private OnClickCreateEmployee(): void {
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
            const response: string = await ApiCompanyEmployee.CreateEmployeeFromSessionUUID(ApiEnter.CurrentSessionUUID as string, ApiCompany.CurrentCompanyUUID as string, result);
            if (response.length != 36) {
                sweetalert({
                    title: "Ошибка!",
                    text: "Во время запроса, возникла ошибка: " + response,
                    icon: "error"
                });
            }
            await this.LoadTable();
        });
    }

}
</script>
