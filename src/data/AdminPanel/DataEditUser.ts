import LeftMenuItemType from "@/struct/ui/Menu/LeftMenuItemType";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import { FormListInputModelType } from "@/struct/form/FormListInputModelType";
import FormInputValidationRuleType from "@/struct/form/FormInputValidationRuleType";
import UtilFormValidation from "@/util/Form/UtilFormValidation";
import { FormGeneratorListInputModelType } from "@/struct/form/FormGenerator/FormGeneratorListInputModelType";
import EUserEnum from "@/struct/user/EUserEnum";

class DataUserEditProfilePage {
    private static OnValidationConfirmEmailRules: FormInputValidationRuleType[] = [(value: string) => value != DataUserEditProfilePage.FormModel.EmailRepeat.value || "Email не совпадает"];

    private static OnValidationConfirmPasswordRules: FormInputValidationRuleType[] = [() => DataUserEditProfilePage.FormModel.Password.value != DataUserEditProfilePage.FormModel.PasswordRepeat.value || "Пароли не совпадают"];

    public static DefaultKeyFromLeftMenu: string = "profile";

    public static DeleteKeyFromLeftMenu: string = "delete";

    public static readonly LeftMenuItems: LeftMenuItemType[] = [
        {
            icon: "fas fa-user-alt",
            label: "Изменить профиль",
            key: DataUserEditProfilePage.DefaultKeyFromLeftMenu,
        },
        {
            icon: "fas fa-lock",
            label: "Изменить пароль",
            key: "password",
        },
        {
            icon: "fas fa-envelope",
            label: "Измененить email",
            key: "email",
        },
        {
            icon: "fas fa-question",
            label: "Изменить статус",
            key: "change-status",
        },
        {
            icon: "fas fa-user-tag",
            label: "Изменить роль",
            key: "change-role",
        },
        {
            icon: "fas fa-trash",
            label: "Удалить профиль",
            key: DataUserEditProfilePage.DeleteKeyFromLeftMenu,
        },
    ];

    public static readonly Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Главная",
        },
        {
            to: "/admin/users",
            text: "Управление пользователями",
        },
        {
            disabled: true,
            to: "/admin/edit-user",
            text: "Редактирование пользователя",
        },
    ];

    public static FormModel: FormListInputModelType = {
        Email: {
            value: "",
            default: "",
            empty: true,
            focused: false,
            valid: false,
            require: true,
            maxlength: 40,
            rules: [...UtilFormValidation.OnValidationEmailRules, ...UtilFormValidation.CreateOnMaxValueLengthRules(40)],
        },
        EmailRepeat: {
            value: "",
            default: "",
            empty: true,
            focused: false,
            valid: false,
            require: true,
            maxlength: 40,
            rules: [...UtilFormValidation.OnValidationEmailRules, ...UtilFormValidation.CreateOnMaxValueLengthRules(40)],
        },
        OldPassword: {
            value: "",
            default: "",
            empty: true,
            focused: false,
            valid: false,
            require: true,
            maxlength: 24,
            rules: [...UtilFormValidation.OnValidationPasswordRules],
        },
        Password: {
            value: "",
            default: "",
            empty: true,
            focused: false,
            valid: false,
            require: true,
            maxlength: 24,
            rules: [...UtilFormValidation.OnValidationPasswordRules],
        },
        PasswordRepeat: {
            value: "",
            default: "",
            empty: true,
            focused: false,
            valid: false,
            require: true,
            maxlength: 24,
            rules: [...UtilFormValidation.OnValidationPasswordRules],
        },
    };

    public static FormUserData: FormGeneratorListInputModelType = {
        Name: {
            name: "Имя",
            message: "",
            value: "",
            default: "",
            type: "text",
            maxlength: 24,
            rules: [...UtilFormValidation.CreateOnMinValueLengthRules(2, true), ...UtilFormValidation.CreateOnMaxValueLengthRules(24)],
        },
        SecondName: {
            name: "Фамилия",
            message: "",
            value: "",
            default: "",
            type: "text",
            maxlength: 24,
            rules: [...UtilFormValidation.CreateOnMinValueLengthRules(2, true), ...UtilFormValidation.CreateOnMaxValueLengthRules(24)],
        },
        LastName: {
            name: "Отчество",
            message: "",
            value: "",
            default: "",
            type: "text",
            maxlength: 24,
            rules: [...UtilFormValidation.CreateOnMinValueLengthRules(2, true), ...UtilFormValidation.CreateOnMaxValueLengthRules(24)],
        },
        Phone: {
            name: "Телефон",
            message: "",
            value: "",
            default: "",
            type: "text",
            maxlength: 15,
            rules: [...UtilFormValidation.CreateOnMinValueLengthRules(10, true), ...UtilFormValidation.CreateOnMaxValueLengthRules(15)],
        },
        Birthday: {
            name: "Дата рождения",
            message: "",
            value: "",
            default: "",
            type: "text",
        },
        Sex: {
            name: "Пол",
            message: "",
            value: "",
            default: "",
            type: "select",
            select: [
                {
                    label: "Мужчина",
                    value: "m"
                },
                {
                    label: "Женщина",
                    value: "f"
                }
            ],
            rules: [...UtilFormValidation.OnValidationSexRules],
        },
    };

    public static FormUserEmail: FormGeneratorListInputModelType = {
        Email: {
            name: "Email пользователя",
            message: "",
            value: "",
            default: "",
            type: "text",
            maxlength: 40,
            rules: [...UtilFormValidation.OnValidationEmailRules, ...UtilFormValidation.CreateOnMaxValueLengthRules(40)],
        },
    };

    public static FormUserPassword: FormGeneratorListInputModelType = {
        Password: {
            name: "Новый пароль пользователя",
            message: "",
            value: "",
            default: "",
            type: "text",
            maxlength: 24,
            rules: [...UtilFormValidation.OnValidationPasswordRules],
        },
        PasswordRepeat: {
            name: "Повторите пароль",
            message: "",
            value: "",
            default: "",
            type: "text",
            maxlength: 24,
            rules: [...UtilFormValidation.OnValidationPasswordRules],
        },
    };

    public static FormChangeStatus: FormGeneratorListInputModelType = {
        Status: {
            name: "Изменение статуса",
            message: "",
            value: "",
            default: "",
            type: "select",
            maxlength: 20,
            select: [
                {
                    label: 'Активный',
                    value: EUserEnum.UserStatus.Active
                },
                {
                    label: 'Неактивный',
                    value: EUserEnum.UserStatus.NoActive
                }
            ],
            rules: []
        }
    }

    public static FormChangeRole: FormGeneratorListInputModelType = {
        Role: {
            name: "Изменения роли",
            message: "",
            value: "",
            default: "",
            type: "select",
            maxlength: 20,
            select: [
                {
                    label: 'Пользователь',
                    value: EUserEnum.SystemRole.NoRole
                },
                {
                    label: 'Администратор',
                    value: EUserEnum.SystemRole.Admin
                },
            ],
            rules: []
        }
    }

    public static ClearFormModel(): void {
        for (const formItem in DataUserEditProfilePage.FormModel) {
            DataUserEditProfilePage.FormModel[formItem].value = DataUserEditProfilePage.FormModel[formItem].default;
        }
    }

}

export default DataUserEditProfilePage;
