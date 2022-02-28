import CompanyTableRowType from "@/struct/company/CompanyTableRowType";

interface CompanyStoreType {
    CurrentCompanyList: CompanyTableRowType[] | undefined;
    CurrentCompanyItem: CompanyTableRowType | undefined | null;
}

export default CompanyStoreType;