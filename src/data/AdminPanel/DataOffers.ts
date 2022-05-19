import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";


export default class DataOffers {

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

    public static OfferCreateBreadcrumbs: BreadcrumbsItemType[] = [
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
            exact: true,
            text: "Offers"
        },
        {
            to: "/admin/catalog/offers/create",
            text: "Offer create",
            disabled: true
        },
    ];

    public static OfferEditBreadcrumbs: BreadcrumbsItemType[] = [
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
            exact: true,
            text: "Offers"
        },
        {
            to: "/admin/catalog/offers/create",
            text: "Offer edit",
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
            value: "active"
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
