import ECompanyEmployeeEnum from "./ECompanyEmployeeEnum";
import EUserEnum from "@/struct/user/EUserEnum";

interface CompanyEmployeeExRowType {
    id: string;
    uuid: string;
    company_uuid: string;
    user_uuid: string;
    role: ECompanyEmployeeEnum.CompanyEmployeeRole;
    status: ECompanyEmployeeEnum.CompanyEmployeeStatus;
    email: string;
    user_id: number;
    user_status: EUserEnum.UserStatus;
    first_name: string;
    last_name: string;
}

export default CompanyEmployeeExRowType;