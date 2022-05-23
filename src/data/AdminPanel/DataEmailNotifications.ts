import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";

export default class DataEmailNotifications {

    public static Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/",
            text: "Settings"
        },
        {
            text: "Email Notifications",
            disabled: true
        },
    ];

    public static BreadcrumbsEdit: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/",
            text: "Settings"
        },
        {
            to: "/settings/email-notifications",
            exact: true,
            text: "Email Notifications",
        },
        {
            text: "Edit",
            disabled: true
        },
    ];

    public static BreadcrumbsCreate: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/",
            text: "Settings"
        },
        {
            to: "/settings/email-notifications",
            exact: true,
            text: "Email Notifications",
        },
        {
            text: "Create",
            disabled: true
        },
    ];

    public static TableHeaders: TableHeaderItemType[] = [
        {
            text: "Updated",
            value: "update"
        },
        {
            text: "Template name",
            value: "template_name"
        },
        {
            text: "Action",
            value: "action"
        }
    ];
}
