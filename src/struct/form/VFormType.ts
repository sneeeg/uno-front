interface VFormType {
    disabled: boolean;
    "lazy-validation": boolean;
    readonly: boolean;
    value: boolean;

    reset(): void;

    resetValidation(): void;

    validate(): boolean;
}

export default VFormType;
