import { FormGeneratorListInputModelType } from "@/struct/form/FormGenerator/FormGeneratorListInputModelType";
import UtilFormValidation from "@/util/Form/UtilFormValidation";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";

class DataBlogCreate {
    public static BlogInfoModel: FormGeneratorListInputModelType = {
        Title: {
            name: "Title",
            message: "Title of article",
            value: "",
            default: "",
            type: "text",
            maxlength: 128
        },
        Image: {
            name: "Image",
            message: "Image of article",
            value: "",
            default: "",
            type: "text",
            maxlength: 256,
            rules: [...UtilFormValidation.CreateOnMinValueLengthRules(2), ...UtilFormValidation.CreateOnMaxValueLengthRules(256)],
        },
        IsShow: {
            name: "Is show",
            message: "",
            value: "",
            default: "",
            type: "select",
            maxlength: 20,
            select: [
                {
                    label: 'True',
                    value: 'true'
                },
                {
                    label: 'False',
                    value: 'false'
                },
            ],
            rules: []
        }
    };

    public static Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/",
            text: "CMS",
        },
        {
            to: "/admin/catalog/categories",
            text: "Blog",
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
            text: "Name",
            value: "title",
            width: '70%'
        },
        {
            text: "Action",
            value: "action"
        }

    ];
}

export default DataBlogCreate
