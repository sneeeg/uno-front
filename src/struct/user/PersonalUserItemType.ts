import EUserEnum from "./EUserEnum";

interface PersonalUserItemType {
    user_id: number;
    user_uuid: string;
    email: string;
    photo: string;
    first_name: string;
    last_name: string;
    second_name: string;
    phone: string;
    birthday: string;
    sex: "m" | "f" | "n";
    system_role: EUserEnum.SystemRole;
    status: EUserEnum.UserStatus;
}

export default PersonalUserItemType;