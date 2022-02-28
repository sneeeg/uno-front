import ETenantEnum from "@/struct/tenant/ETenantEnum";

interface TenantTableRowType {
    id: number;
    uuid: string;
    shortcode: string;
    name: string;
    status: ETenantEnum.TenantStatus;
}

export default TenantTableRowType;