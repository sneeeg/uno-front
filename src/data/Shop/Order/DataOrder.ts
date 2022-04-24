import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";

class DataOrder {

    public static Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/shop/orders",
            text: "E-Shop",
        },
        {
            to: "/shop/orders",
            text: "Order management",
            disabled: true
        },
    ];

    public static TableHeaders: TableHeaderItemType[] = [
        {
            text: "Date",
            value: "create_at",
            width: '15%'
        },
        {
            text: "Order",
            value: "name"
        },
        {
            text: "Customer",
            value: "customer"
        },
        {
            text: "E-Mail",
            value: "mail"
        },
        {
            text: "Total",
            value: "total"
        },
        {
            text: "Order status",
            value: "order_status"
        },
        {
            text: "Payment status",
            value: "payment_status"
        }
    ];
}

export default DataOrder
