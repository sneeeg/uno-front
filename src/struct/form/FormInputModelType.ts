import FormInputValidationRuleType from "@/struct/form/FormInputValidationRuleType";

interface FormInputModelType {
    value: string | any;
    name?: string;
    message?: string;
    empty: boolean;
    focused: boolean;
    valid: boolean;
    default?: string | any;
    type?: string;
    maxlength?: number;
    require?: boolean;
    rules?: FormInputValidationRuleType[];
}

export default FormInputModelType;