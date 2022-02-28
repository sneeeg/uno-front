import LeftMenuItemType from "@/struct/ui/Menu/LeftMenuItemType";

class DataLeftMenuInCompany {
    public static readonly LeftMenuItems: LeftMenuItemType[] = [
        {
            icon: "fas fa-user-alt",
            label: "Изменить профиль",
            key: "profile"
        },
        {
            icon: "fas fa-lock",
            label: "Изменить пароль",
            key: "password"
        },
        {
            icon: "fas fa-envelope",
            label: "Измененить email",
            key: "email"
        },
        {
            icon: "fas fa-trash",
            label: "Удалить профиль",
            key: "delete"
        }
    ];
}

export default DataLeftMenuInCompany;
