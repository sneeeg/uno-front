namespace EUserEnum {

    export enum SystemRole {
        NoRole,
        Admin,
        SuperAdmin,
        __LENGHT
    }

    export enum UserStatus {
        NoActive,
        Active,
        Created,
        Banned,
        Deleted,
        __LENGHT
    }
}

export default EUserEnum;