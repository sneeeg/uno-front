import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";

export default class DataSupportFiles {

    public static FilesListBreadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/admin",
            text: "CMS"
        },
        {
            to: "/cms/files",
            exact: true,
            text: "Support (Files)"
        },
        {
            to: "/cms/files",
            text: "Files",
            disabled: true
        },
    ];

    public static FilesListTableHeaders: TableHeaderItemType[] = [
        {
            text: "Sorting",
            value: "priority",
            width: '10%'
        },
        {
            text: "File name",
            value: "name",
            width: '45%'
        },
        {
            text: "Category",
            value: "category",
            width: '35%'
        },
        {
            text: "Action",
            value: "action"
        }
    ];

    public static CategoriesTableHeaders: TableHeaderItemType[] = [
        {
            text: "Sorting",
            value: "priority",
            width: '10%'
        },
        {
            text: "Category name",
            value: "name",
            width: '60%'
        },
        {
            text: "Action",
            value: "action"
        }
    ];
}
