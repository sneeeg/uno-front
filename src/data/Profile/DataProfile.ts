import SexDataUiType from "@/struct/user/SexDataUiType";

class DataProfile {
    public static readonly SelectSexList: SexDataUiType[] = [
        {
            label: "Мужской",
            value: "m"
        },
        {
            label: "Женский",
            value: "f"
        }
    ];
}

export default DataProfile;