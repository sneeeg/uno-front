import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";


export default class DataFaq {

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

    public static FaqQuestionsBreadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/admin",
            text: "CMS"
        },
        {
            to: "/admin/faq/edit",
            text: "Support(FAQ)"
        },
        {
            to: "/admin/faq/edit",
            text: "Qestions",
            disabled: true
        },
    ];

    public static QuestionsTableHeaders: TableHeaderItemType[] = [
        {
            text: "Sorting",
            value: "sorting",
            width: '10%'
        },
        {
            text: "Question",
            value: "question",
            width: '40%'
        },
        {
            text: "Category",
            value: "category",
            width: '30%'
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
