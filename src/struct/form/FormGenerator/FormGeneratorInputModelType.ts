import FormGeneratorSelectItemType from "@/struct/form/FormGenerator/FormGeneratorSelectItemType";
import FormGeneratorInputValidationRuleType from "@/struct/form/FormGenerator/FormGeneratorInputValidationRuleType";

interface FormGeneratorInputModelType {
    name: string;
    message?: string;

    value: string | boolean;
    default: string | boolean;
    type: "text" | "checkbox" | "select";
    select?: FormGeneratorSelectItemType[];

    maxlength?: number;

    rules?: FormGeneratorInputValidationRuleType[];
}

export default FormGeneratorInputModelType;
