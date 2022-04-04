import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";


export default class DataOptions {

    public static Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/admin/options",
            text: "Options and Services",
            disabled: true
        },
    ];

    public static TableHeaders: TableHeaderItemType[] = [
        {
            text: "Sorting",
            value: "priority"
        },
        {
            text: "Option name",
            value: "name"
        },
        {
            text: "Price, €",
            value: "price"
        },
        {
            text: "Action",
            value: "action"
        }

    ];
}
