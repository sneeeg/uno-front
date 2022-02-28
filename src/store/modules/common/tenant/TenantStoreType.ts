import TenantTableRowType from "@/struct/tenant/TenantTableRowType";

interface TenantStoreType {
    CurrentTenant: TenantTableRowType | null | undefined;
}

export default TenantStoreType;