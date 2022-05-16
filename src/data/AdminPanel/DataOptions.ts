import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";


export default class DataOptions {

    public static Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/shop/options",
            text: "Options and Services",
            disabled: true
        },
    ];

    public static BreadcrumbsCreate: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/shop/options",
            exact: true,
            text: "Options and Services",
        },
        {
            text: "Create",
            disabled: true
        },
    ];

    public static TableHeaders: TableHeaderItemType[] = [
        {
            text: "Sorting",
            value: "priority",
            width: '15%'
        },
        {
            text: "Option name",
            value: "name",
            width: '25%'
        },
        {
            text: "Price, €",
            value: "price",
            width: '45%'
        },
        {
            text: "Action",
            value: "action"
        }

    ];
}
