import ECompanyEnum from "./ECompanyEnum";

interface CompanyTableRowType {
    id: string;
    uuid: string;
    owner_user_uuid: string;
    name: string;
    status: ECompanyEnum.CompanyStatus;
}

export default CompanyTableRowType;