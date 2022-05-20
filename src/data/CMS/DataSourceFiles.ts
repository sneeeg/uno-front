import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";

export default class DataSourceFiles {

    public static Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/",
            text: "CMS"
        },
        {
            to: "/cms/source-files",
            text: "Source files for content",
            disabled: true
        },
    ];

    public static TableHeaders: TableHeaderItemType[] = [
        {
            text: "File Name",
            value: "file_name"
        },
        {
            text: "Description",
            value: "description"
        },
        {
            text: "Created at",
            value: "create_at"
        },
        {
            text: "Update at",
            value: "update"
        },
        {
            text: "Action",
            value: "action"
        }
    ];
}
