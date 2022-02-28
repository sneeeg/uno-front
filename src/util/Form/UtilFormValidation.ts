import FormInputValidationRuleType from "@/struct/form/FormInputValidationRuleType";
import UtilEmail from "@/util/Common/UtilEmail";
import UtilSex from "@/util/Common/UtilSex";

class UtilFormValidation {
    public static OnValidationEmailRules: FormInputValidationRuleType[] = [(value: string) => value.length == 0 || UtilEmail.CanValidEmail(value) || "Не корректный Email"];

    public static OnValidationSexRules: FormInputValidationRuleType[] = [(value: string) => UtilSex.CanValidSex(value, true) || "Не корретный пол"];

    public static OnValidationPasswordRules: FormInputValidationRuleType[] = [(value: string) => value.length >= 6 || "Пароль должен быть не менее 6 символов", (value: string) => value.length <= 24 || "Пароль не должен привышать 24 символа"];

    public static CreateOnMaxValueLengthRules(maxLength: number): FormInputValidationRuleType[] {
        return [(value: string) => value.length <= maxLength || `Значение не должно привышать ${maxLength} символов`];
    }

    public static CreateOnMinValueLengthRules(minLength: number, allow_empty?: boolean): FormInputValidationRuleType[] {
        return [(value: string) => value.length >= minLength || (allow_empty && value.length == 0) || `Значение должно быть не меньше ${minLength} символов`];
    }

    public static OnValidationExactNumber(length: number): FormInputValidationRuleType[] {
        return [(value: string) => (value.length == length && /^\d+$/.test(value)) || `Значение должно содержать ${length} символов`];
    }

    public static OnValidationInn: FormInputValidationRuleType[] = [(value: string) => value.length == 10 || (value.length == 12 && /^\d+$/.test(value)) || "Введите корректный ИНН"];

    public static OnValidationOgrn: FormInputValidationRuleType[] = [(value: string) => value.length == 13 || (value.length == 15 && /^\d+$/.test(value)) || "Введите корректный ОГРН/ОГРНИП"];
}

export default UtilFormValidation;
