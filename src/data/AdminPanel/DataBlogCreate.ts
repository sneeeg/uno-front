import { FormGeneratorListInputModelType } from "@/struct/form/FormGenerator/FormGeneratorListInputModelType";
import UtilFormValidation from "@/util/Form/UtilFormValidation";

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
}

export default DataBlogCreate
