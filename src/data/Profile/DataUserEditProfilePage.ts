import LeftMenuItemType from "@/struct/ui/Menu/LeftMenuItemType";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import { FormListInputModelType } from "@/struct/form/FormListInputModelType";
import FormInputValidationRuleType from "@/struct/form/FormInputValidationRuleType";
import UtilFormValidation from "@/util/Form/UtilFormValidation";

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
            to: "/profile",
            text: "Профиль",
        },
        {
            disabled: true,
            to: "/profile/edit",
            text: "Редактирование профиля",
        },
    ];

    public static readonly FormModel: FormListInputModelType = {
        Name: {
            value: "",
            default: "",
            empty: true,
            focused: false,
            valid: false,
            require: true,
            maxlength: 24,
            rules: [...UtilFormValidation.CreateOnMinValueLengthRules(2, true), ...UtilFormValidation.CreateOnMaxValueLengthRules(24)],
        },
        SecondName: {
            value: "",
            default: "",
            empty: true,
            focused: false,
            valid: false,
            require: true,
            maxlength: 24,
            rules: [...UtilFormValidation.CreateOnMinValueLengthRules(2, true), ...UtilFormValidation.CreateOnMaxValueLengthRules(24)],
        },
        LastName: {
            value: "",
            default: "",
            empty: true,
            focused: false,
            valid: false,
            require: true,
            maxlength: 24,
            rules: [...UtilFormValidation.CreateOnMinValueLengthRules(2, true), ...UtilFormValidation.CreateOnMaxValueLengthRules(24)],
        },
        Phone: {
            value: "",
            default: "",
            empty: true,
            focused: false,
            valid: false,
            require: true,
            maxlength: 15,
            rules: [...UtilFormValidation.CreateOnMinValueLengthRules(10, true), ...UtilFormValidation.CreateOnMaxValueLengthRules(15)],
        },
        Birthday: {
            value: "",
            default: "",
            empty: true,
            focused: false,
            valid: false,
            require: true,
        },
        Sex: {
            value: "",
            default: "",
            empty: true,
            focused: false,
            valid: false,
            require: true,
            rules: [...UtilFormValidation.OnValidationSexRules],
        },
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

    public static ClearFormModel(): void {
        for (const formItem in DataUserEditProfilePage.FormModel) {
            DataUserEditProfilePage.FormModel[formItem].value = DataUserEditProfilePage.FormModel[formItem].default;
        }
    }
}

export default DataUserEditProfilePage;
