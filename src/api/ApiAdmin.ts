import axios, { AxiosResponse } from "axios";
import IAdminPanelUserList from "@/struct/admin-panel/IAdminPanelUserList";
import PersonalUserItemType from "@/struct/user/PersonalUserItemType";
import IAdminPanelCompanyList from "@/struct/admin-panel/IAdminPanelCompanyList";

class ApiAdminPanel {
    public static async GetUsers(session_uuid: string): Promise<IAdminPanelUserList[] | undefined> {
        try {
            const result = await axios.get("/api/admin/get-users", {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.data;
        } catch (e) {
            throw new Error("Error get users");
        }

    }

    public static async GetUser(session_uuid: string, user_uuid: string): Promise<PersonalUserItemType | any> {
        try {
            const result = await axios.post("/api/admin/get-user", {
                user_uuid: user_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.data;
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    public static async UpdateUserData(first_name: string | boolean, last_name: string | boolean, second_name: string | boolean, phone: string | boolean, birthday: string | boolean, sex: "m" | "f", session_uuid: string, user_uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-user-info", {
                first_name: first_name,
                last_name: last_name,
                second_name: second_name,
                phone: phone,
                birthday: birthday,
                sex: sex,
                user_uuid: user_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error get users");
        }
    }

    public static async UpdateUserStatus(user_uuid: string, session_uuid: string, status: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-status", {
                status: status,
                user_uuid: user_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error update status");
        }

    }

    public static async UpdateUserRole(user_uuid: string, session_uuid: string, role: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-role", {
                system_role: role,
                user_uuid: user_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error update role");
        }

    }

    public static async DeleteUser(session_uuid: string, user_uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/delete-user", {
                user_uuid: user_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error get users");
        }

    }

    public static async UpdateEmail(email: string, user_uuid: string, session_uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/update-email", {
                email: email,
                user_uuid: user_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error get users");
        }

    }

    public static async UpdatePassword(password: string, user_uuid: string, session_uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/update-password", {
                password: password,
                user_uuid: user_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error get users");
        }

    }

    public static async GetCompanies(session_uuid: string): Promise<IAdminPanelCompanyList[] | undefined> {
        try {
            const result = await axios.post("/api/admin/get-companies", {
                limit: "100",
                offset: "0",
                search: ""
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.data;
        } catch (e) {
            throw new Error("Error get companies");
        }
    }

    public static async GetCompanyByUUID(session_uuid: string, company_uuid: string): Promise<IAdminPanelCompanyList[] | undefined> {
        try {
            const result = await axios.post("/api/admin/get-company", {
                company_uuid: company_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.data;
        } catch (e) {
            return undefined;
        }
    }

    public static async UpdateCompanyInfo(session_uuid: string, company_uuid: string, offical_name: string | boolean, inn: string | boolean, ogrn: string | boolean, offical_address: string | boolean, address: string | boolean): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-company-legal-info", {
                company_uuid: company_uuid,
                offical_name: offical_name,
                offical_address: offical_address,
                address: address,
                inn: inn,
                ogrn: ogrn
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            return undefined;
        }
    }

    public static async UpdateContactInfo(session_uuid: string, company_uuid: string, ceo_full_name: string | boolean, company_email: string | boolean, company_phone: string | boolean): Promise<IAdminPanelCompanyList[] | undefined> {
        try {
            const result = await axios.post("/api/admin/change-company-contact-info", {
                company_uuid: company_uuid,
                ceo_full_name: ceo_full_name,
                company_email: company_email,
                company_phone: company_phone
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            return undefined;
        }
    }

    public static async UpdateFinanceInfo(session_uuid: string, company_uuid: string, bank_rs: string | boolean, bik: string | boolean, bank_ks: string | boolean, bank_name: string | boolean): Promise<IAdminPanelCompanyList[] | undefined> {
        try {
            const result = await axios.post("/api/admin/change-company-bank-info", {
                company_uuid: company_uuid,
                bank_rs: bank_rs,
                bik: bik,
                bank_ks: bank_ks,
                bank_name: bank_name
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            return undefined;
        }
    }

    public static async DeleteCompany(session_uuid: string, company_uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/delete-company", {
                company_uuid: company_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            return undefined;
        }
    }

    public static async UpdateCompanyStatus(session_uuid: string, company_uuid: string, status: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-company-status", {
                company_uuid: company_uuid,
                status: status
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            return undefined;
        }
    }

    public static async UpdateCompanyOwner(session_uuid: string, company_uuid: string, user_uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/update-owner-company", {
                company_uuid: company_uuid,
                user_uuid: user_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            return undefined;
        }
    }

    public static async LoginOnUser(session_uuid: string, email: string): Promise<undefined | string> {
        try {
            const result = await axios.post("/api/admin/login-on-user-session", {
                email: email
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.session_uuid;
        } catch (e) {
            return undefined;
        }
    }

    public static async GetFaq(session_uuid: string): Promise<IAdminPanelCompanyList[] | undefined> {
        try {
            const result = await axios.get("/api/admin/get-faq", {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.data;
        } catch (e) {
            throw new Error("Error get faq");
        }
    }
    public static async CreateFaq(session_uuid: string, answer: string , question: string): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/admin/faq-create", {
                answer: answer,
                question: question,
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
    public static async DeleteFaq(session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/faq-delete", {
                uuid: uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            return undefined;
        }
    }

    public static async GetBlog(session_uuid: string): Promise<IAdminPanelCompanyList[] | undefined> {
        try {
            const result = await axios.get("/api/admin/get-blog", {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.data;
        } catch (e) {
            throw new Error("Error get blog");
        }
    }
    public static async CreateBlog(session_uuid: string, title: string | boolean, is_show: string | boolean, image: string | boolean, content: string | boolean): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/admin/create-blog", {
                title: title,
                is_show: is_show,
                image: image,
                content: content
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
    public static async DeleteBlog(session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/delete-blog", {
                uuid: uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            return undefined;
        }
    }
    public static async GetBlogByUUID(session_uuid: string, blog_uuid: string): Promise<IAdminPanelCompanyList[] | undefined> {
        try {
            const result = await axios.post("/api/admin/get-blog-by", {
                blog_uuid: blog_uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.data;
        } catch (e) {
            return undefined;
        }
    }
    public static async UpdateBlogInfo(title: string | boolean, is_show: string | boolean, image: string | boolean, content: string | boolean, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-blog-info", {
                title: title,
                is_show: is_show,
                image: image,
                content: content,
                uuid: uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error get blog");
        }
    }
}

export default ApiAdminPanel;
