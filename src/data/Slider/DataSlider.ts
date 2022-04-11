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
            value: "title",
            width: '65%'
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
