import axios, { AxiosResponse } from "axios";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";
import CompanyLegalInfoTableRowType from "@/struct/company/CompanyLegalInfoTableRowType";
import CompanyContactInfoTableRowType from "@/struct/company/CompanyContactInfoTableRowType";
import CompanyBankInfoTableRowType from "@/struct/company/CompanyBankInfoTableRowType";

class ApiCompany {
    public static CurrentCompanyUUID: string | undefined = undefined;

    public static async CreateCompanyFromSession(session_uuid: string, name: string | boolean, offical_inn: string | boolean, offical_ogrn: string | boolean, offical_name: string | boolean): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/company/create", {
                name: name,
                offical_name: offical_name,
                offical_inn: offical_inn,
                offical_ogrn: offical_ogrn
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            console.error(e);
            if ("response" in e && "data" in e.response && "response" in e.response.data) {
                return e.response.data.response;
            }
        }
        return undefined;
    }

    public static async UpdateCompanyLegalInfoFromSession(session_uuid: string, company_uuid: string, offical_addres: string | boolean, offical_name: string | boolean, addres: string | boolean): Promise<boolean> {
        try {
            const result: AxiosResponse<{ response: boolean }> = await axios.post("/api/company/update-legal-info", {
                offical_name: offical_name,
                offical_addres: offical_addres,
                addres: addres
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

    public static async GetCompanyListFromSession(session_uuid: string): Promise<CompanyTableRowType[] | undefined> {
        try {
            const result: AxiosResponse<{ response: CompanyTableRowType[] }> = await axios.get("/api/company/get-list", {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            console.error(e);
        }
        return undefined;
    }

    public static async GetCompanyItemFromSession(session_uuid: string, company_uuid: string): Promise<CompanyTableRowType | null> {
        try {
            const result: AxiosResponse<{ response: CompanyTableRowType | null }> = await axios.get("/api/company/get", {
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
        return null;
    }

    public static async GetCompanyLegalInfoFromSession(session_uuid: string, company_uuid: string): Promise<CompanyLegalInfoTableRowType | null> {
        try {
            const result: AxiosResponse<{ response: CompanyLegalInfoTableRowType | null }> = await axios.get("/api/company/get-legal-info", {
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
        return null;
    }

    public static async GetCompanyContactInfoFromSession(session_uuid: string, company_uuid: string): Promise<CompanyContactInfoTableRowType | null> {
        try {
            const result: AxiosResponse<{ response: CompanyContactInfoTableRowType | null }> = await axios.get("/api/company/get-contact-info", {
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
        return null;
    }

    public static async GetCompanyBankInfoFromSession(session_uuid: string, company_uuid: string): Promise<CompanyBankInfoTableRowType | null> {
        try {
            const result: AxiosResponse<{ response: CompanyBankInfoTableRowType | null }> = await axios.get("/api/company/get-bank-info", {
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
        return null;
    }

    public static async UpdateCompanyContactInfoFromSession(session_uuid: string, company_uuid: string, ceo_full_name: string | boolean, company_email: string | boolean, company_phone: string | boolean): Promise<boolean> {
        try {
            const result: AxiosResponse<{ response: boolean }> = await axios.post("/api/company/update-contact-info", {
                ceo_full_name: ceo_full_name,
                company_email: company_email,
                company_phone: company_phone
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

    public static async UpdateCompanyBankInfoFromSession(session_uuid: string, company_uuid: string, bank_rs: string | boolean, bik: string | boolean, bank_ks: string | boolean, bank_name: string | boolean): Promise<boolean> {
        try {
            const result: AxiosResponse<{ response: boolean }> = await axios.post("/api/company/update-bank-info", {
                bank_rs: bank_rs,
                bik: bik,
                bank_ks: bank_ks,
                bank_name: bank_name
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

    public static async UpdateCompanyNameFromSession(session_uuid: string, company_uuid: string, name: string | boolean): Promise<boolean> {
        try {
            const result: AxiosResponse<{ response: boolean }> = await axios.post("/api/company/update-name", {
                name: name
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
}

export default ApiCompany;
