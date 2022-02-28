class UtilSex {
    public static CanValidSex(value: string, allowDefaultValue: boolean = false): boolean {
        if (value == "f" || value == "m") {
            return true;
        }
        if (allowDefaultValue == true && value == "n") {
            return true;
        }
        return false;
    }
}

export default UtilSex;
