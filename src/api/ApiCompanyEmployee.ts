import axios, { AxiosResponse } from "axios";
import CompanyEmployeeExRowType from "@/struct/company/CompanyEmployeeExRowType";
import ECompanyEmployeeEnum from "@/struct/company/ECompanyEmployeeEnum";
import CompanyEmployeeStatus = ECompanyEmployeeEnum.CompanyEmployeeStatus;

class ApiCompanyEmployee {
    public static async GetEmployeeListFromSessionUUID(session_uuid: string, company_uuid: string): Promise<CompanyEmployeeExRowType[]> {
        try {
            const result: AxiosResponse<{ response: CompanyEmployeeExRowType[] }> = await axios.get("/api/employee/get-list", {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid,
                    "x-company-uuid": company_uuid

                }
            });
            return result.data.response;
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    public static async SetEmployeeRoleFromSessionUUID(session_uuid: string, company_uuid: string, employee_uuid: string, role: ECompanyEmployeeEnum.CompanyEmployeeRole): Promise<boolean> {
        try {
            const result: AxiosResponse<{ response: boolean }> = await axios.post("/api/employee/update-role", {
                employee_uuid: employee_uuid,
                role: role
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid,
                    "x-company-uuid": company_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    public static async SetEmployeeStatusFromSessionUUID(session_uuid: string, company_uuid: string, employee_uuid: string, status: ECompanyEmployeeEnum.CompanyEmployeeStatus): Promise<boolean> {
        try {
            const method = (status == CompanyEmployeeStatus.NoActive ? "de-" : "") + "active";
            const result: AxiosResponse<{ response: boolean }> = await axios.post("/api/employee/" + method, {
                employee_uuid: employee_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid,
                    "x-company-uuid": company_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    public static async DeleteEmployeeFromSessionUUID(session_uuid: string, company_uuid: string, employee_uuid: string): Promise<boolean> {
        try {
            const result: AxiosResponse<{ response: boolean }> = await axios.post("/api/employee/delete", {
                employee_uuid: employee_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid,
                    "x-company-uuid": company_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    public static async CreateEmployeeFromSessionUUID(session_uuid: string, company_uuid: string, email: string): Promise<string> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/employee/create", {
                email: email,
                role: 0
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid,
                    "x-company-uuid": company_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            let response = "unknown";
            if ("response" in e && "data" in e.response) {
                response = e.response.data.response;
            }
            console.error(e);
            return response;
        }
    }
}

export default ApiCompanyEmployee;