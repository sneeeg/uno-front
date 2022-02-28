import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import UtilFormValidation from "@/util/Form/UtilFormValidation";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";
import { FormGeneratorListInputModelType } from "@/struct/form/FormGenerator/FormGeneratorListInputModelType";

class DataCompanyEdit {
    public static GetBreadcrumbs(currentCompany: CompanyTableRowType | undefined): BreadcrumbsItemType[] {
        return [
            {
                to: "/",
                text: "Главная"
            },
            {
                to: "/company/list",
                text: "Компании"
            },
            {
                to: "/company/dashboard/" + currentCompany?.uuid,
                text: "(" + currentCompany?.id + ") " + currentCompany?.name
            },
            {
                disabled: true,
                to: "/company/edit/" + currentCompany?.uuid + "",
                text: "Редактирование"
            }
        ];
    }

    public static CompanyInfoModel: FormGeneratorListInputModelType = {
        OfficalName: {
            name: "Юридическое название компании",
            message: "Юридическое название, по кторому формируются документы.",
            value: "",
            default: "",
            type: "text",
            maxlength: 128,
            rules: [...UtilFormValidation.CreateOnMinValueLengthRules(2), ...UtilFormValidation.CreateOnMaxValueLengthRules(128)],
        },
        Name: {
            name: "Название компании",
            message: "Формальное название, по кторому вы и поддержка будет ориентироваться.",
            value: "",
            default: "",
            type: "text",
            maxlength: 128,
            rules: [...UtilFormValidation.CreateOnMinValueLengthRules(2), ...UtilFormValidation.CreateOnMaxValueLengthRules(128)],
        },
        Inn: {
            name: "ИНН компании",
            message: "ИНН номер компании, налоговый номер компании\n",
            value: "",
            default: "",
            type: "text",
            maxlength: 12,
            rules: [...UtilFormValidation.OnValidationInn, ...UtilFormValidation.CreateOnMaxValueLengthRules(12)],
        },
        Ogrn: {
            name: "ОГРН/ОГРНИП компании",
            message: "ОГРН или ОГРНИП номер компании, регистрационный номер компании.",
            value: "",
            default: "",
            type: "text",
            maxlength: 15,
            rules: [...UtilFormValidation.OnValidationOgrn, ...UtilFormValidation.CreateOnMaxValueLengthRules(15)],
        },
        OfficalAddress: {
            name: "Юридический адрес компании",
            message: "Юридический адрес, который фигурирует в документах.",
            value: "",
            default: "",
            type: "text",
            maxlength: 128,
            rules: [...UtilFormValidation.CreateOnMaxValueLengthRules(128)],
        },
        Address: {
            name: "Фактический адрес компании",
            message: "Фактический адрес, на который будет отправляться почта.",
            value: "",
            default: "",
            type: "text",
            maxlength: 128,
            rules: [...UtilFormValidation.CreateOnMaxValueLengthRules(128)],
        },
    };

    public static ContactInfoModel: FormGeneratorListInputModelType = {
        CeoFullName: {
            name: "ФИО Директора",
            message: "ФИО исполняющего Директора, для формирования документов.",
            value: "",
            default: "",
            type: "text",
            maxlength: 64,
            rules: [...UtilFormValidation.CreateOnMaxValueLengthRules(64)],
        },
        CompanyEmail: {
            name: "Email для связи",
            message: "Email для получения документов, оповещений и связи.",
            value: "",
            default: "",
            type: "text",
            maxlength: 64,
            rules: [...UtilFormValidation.CreateOnMaxValueLengthRules(64), ...UtilFormValidation.OnValidationEmailRules],
        },
        CompanyPhone: {
            name: "Телефон для связи",
            message: "Телефон для связи с компанией и отвественными лицами.",
            value: "",
            default: "",
            type: "text",
            maxlength: 24,
            rules: [...UtilFormValidation.CreateOnMaxValueLengthRules(24)],
        },
    };

    public static FinanceInfoModel: FormGeneratorListInputModelType = {
        BankRs: {
            name: "Расчётный счёт",
            message: "Расчётный счёт компании, для формирования документов.",
            value: "",
            default: "",
            type: "text",
            maxlength: 20,
            rules: [...UtilFormValidation.OnValidationExactNumber(20)],
        },
        Bik: {
            name: "БИК счёта",
            message: "БИК счёта компании, для формирования документов.",
            value: "",
            default: "",
            type: "text",
            maxlength: 9,
            rules: [...UtilFormValidation.OnValidationExactNumber(9)],
        },
        BankKs: {
            name: "Корреспондентский счёт",
            message: "Корреспондентский счёт компании, для формирования документов.",
            value: "",
            default: "",
            type: "text",
            maxlength: 20,
            rules: [...UtilFormValidation.OnValidationExactNumber(20)],
        },
        BankName: {
            name: "Название банка",
            message: "Название банка держателя счёта, для формирования документов.",
            value: "",
            default: "",
            type: "text",
            maxlength: 64,
            rules: [...UtilFormValidation.CreateOnMaxValueLengthRules(64)],
        },
    };
}

export default DataCompanyEdit;
