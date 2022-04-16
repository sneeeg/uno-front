import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";

export default class DataFeedback {

    public static ContactsTableHeaders: TableHeaderItemType[] = [
        {
            text: "Date",
            value: "create_at",
            width: '10%'
        },
        {
            text: "Topic",
            value: "topic",
        },
        {
            text: "Name",
            value: "name",
        },
        {
            text: "E-mail",
            value: "mail",
        },
        {
            text: "Phone number",
            value: "phone",
        },
        {
            text: "Action",
            value: "action"
        }
    ];

    public static PartnersTableHeaders: TableHeaderItemType[] = [
        {
            text: "Date",
            value: "create_at",
            width: '10%'
        },
        {
            text: "Business name",
            value: "business_name",
        },
        {
            text: "Contact Name",
            value: "contact_name",
        },
        {
            text: "E-mail",
            value: "mail",
        },
        {
            text: "Phone number",
            value: "phone",
        },
        {
            text: "Action",
            value: "action"
        }
    ];
}
