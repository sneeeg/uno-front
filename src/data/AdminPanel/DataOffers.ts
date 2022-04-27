import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";


export default class DataOffers {

    public static Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/admin/catalog/offers",
            text: "Offers",
            disabled: true
        },
    ];

    public static OfferCreateBreadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/admin/catalog/offers",
            text: "Offers"
        },
        {
            to: "/admin/catalog/offers/create",
            text: "Offer create",
            disabled: true
        },
    ];

    public static TableHeaders: TableHeaderItemType[] = [
        {
            text: "Sorting",
            value: "priority"
        },
        {
            text: "Offer name",
            value: "name"
        },
        {
            text: "Category",
            value: "category"
        },
        {
            text: "Tariff transparency",
            value: "sex"
        },
        {
            text: "Price, €",
            value: "price"
        },
        {
            text: "Data, GB",
            value: "data"
        },
        {
            text: "Action",
            value: "action"
        }

    ];
}
