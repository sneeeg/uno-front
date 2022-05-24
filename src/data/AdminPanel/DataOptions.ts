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
            text: "Extras and Services",
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
            text: "Extras and Services",
        },
        {
            text: "Create",
            disabled: true
        },
    ];

    public static BreadcrumbsEdit: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/shop/options",
            exact: true,
            text: "Extras and Services",
        },
        {
            text: "Edit",
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
            text: "Name",
            value: "name",
            width: '25%'
        },
        {
            text: "Type",
            value: "type",
            width: '25%'
        },
        {
            text: "Price, €",
            value: "price",
            width: '25%'
        },
        {
            text: "Action",
            value: "action"
        }

    ];
}
