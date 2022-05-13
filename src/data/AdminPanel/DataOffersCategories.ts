import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";


export default class DataOffersCategories {

    public static Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/shop/offers",
            exact: true,
            text: "Shop",
        },
        {
            to: "/shop/offers",
            text: "Offers",
            disabled: true
        },
    ];

    public static TableHeaders: TableHeaderItemType[] = [
        {
            text: "Sorting",
            value: "priority"
        },
        {
            text: "Category",
            value: "name"
        },
        {
            text: "Action",
            value: "action"
        }

    ];
}
