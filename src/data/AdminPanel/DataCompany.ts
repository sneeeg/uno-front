import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";


export default class DataUser {

    public static Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Главная",
        },
        {
            to: "/admin/users",
            text: "Администрирование компаний",
            disabled: true
        },
    ];

    public static TableHeaders: TableHeaderItemType[] = [
        {
            text: "Название компании",
            value: "name"
        },
        {
            text: "ИНН компании",
            value: "offical_inn"
        },
        {
            text: "ОГРН/ОГРНИП",
            value: "offical_ogrn"
        },
        {
            text: "Адрес",
            value: "address"
        },
        {
            text: "Имя директора",
            value: "ceo_full_name"
        },
        {
            text: "Рассчетный счет",
            value: "bank_rs"
        },
        {
            text: "БИК счёта",
            value: "bik"
        },
        {
            text: "Название банка",
            value: "bank_name"
        },
        {
            text: "Действие",
            value: "action"
        }
    ];
}
