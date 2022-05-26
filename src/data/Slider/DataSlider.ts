import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";

export default class DataSlider {

    public static SliderListBreadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/admin",
            text: "CMS"
        },
        {
            to: "/slider/slides",
            text: "Slider",
            disabled: true
        },
    ];

    public static SliderListTableHeaders: TableHeaderItemType[] = [
        {
            text: "Date",
            value: "create_at",
            width: '20%'
        },
        {
            text: "Slide title",
            value: "name",
            width: '65%'
        },
        {
            text: "Action",
            value: "action"
        }
    ];

    public static SliderDisplayTableHeaders: TableHeaderItemType[] = [
        {
            text: "Sorting",
            value: "slider_sort",
            width: '12%'
        },
        {
            text: "Source",
            value: "from",
            width: '12%'
        },
        {
            text: "Title",
            value: "name",
        },
        {
            text: "Action",
            value: "action"
        }
    ];
}
