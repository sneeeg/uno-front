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
            value: "first_name"
        },
        {
            text: "Offer name",
            value: "second_name"
        },
        {
            text: "Category",
            value: "birthday"
        },
        {
            text: "Tariff transparency",
            value: "sex"
        },
        {
            text: "Price, €",
            value: "email"
        },
        {
            text: "Data, GB",
            value: "user_id"
        },
        {
            text: "Action",
            value: "action"
        }

    ];
}
