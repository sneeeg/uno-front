import ECompanyEmployeeEnum from "./ECompanyEmployeeEnum";

interface CompanyEmployeeTableRowType {
    id: string;
    uuid: string;
    company_uuid: string;
    user_uuid: string;
    role: ECompanyEmployeeEnum.CompanyEmployeeRole;
    status: ECompanyEmployeeEnum.CompanyEmployeeStatus;
}

export default CompanyEmployeeTableRowType;