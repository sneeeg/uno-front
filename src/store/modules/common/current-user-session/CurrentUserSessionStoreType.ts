import PersonalUserItemType from "@/struct/user/PersonalUserItemType";

interface TenantStoreType {
    CurrentSessionUUID: string | undefined;
    CurrentSessionUser: PersonalUserItemType | undefined;
}

export default TenantStoreType;