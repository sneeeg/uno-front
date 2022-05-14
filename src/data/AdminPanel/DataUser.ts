import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";


export default class DataUser {

    public static Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/admin/users",
            text: "Users managment",
            disabled: true
        },
    ];

    public static TableHeaders: TableHeaderItemType[] = [
        {
            text: "Имя",
            value: "first_name"
        },
        {
            text: "Фамилия",
            value: "second_name"
        },
        {
            text: "Дата рождения",
            value: "birthday"
        },
        {
            text: "Пол",
            value: "sex"
        },
        {
            text: "Email",
            value: "email"
        },
        {
            text: "ID Пользователя",
            value: "user_id"
        },
        {
            text: "Действия",
            value: "action"
        }

    ];
}
