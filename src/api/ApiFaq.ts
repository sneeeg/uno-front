import axios, { AxiosResponse } from "axios";

class ApiFaq {
    public static async GetFaq(session_uuid: string): Promise<any[] | undefined> {
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
    public static async GetFaqByUUID(session_uuid: string, uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.post("/api/admin/get-faq-by", {
                uuid: uuid
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
    public static async CreateFaqQuestion(session_uuid: string, answer: string, question: string, priority: string, publish: number, category: string): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/admin/faq-create", {
                answer: answer,
                question: question,
                priority: priority,
                publish: publish,
                category: category
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
    public static async DeleteFaqQuestion(session_uuid: string, uuid: string): Promise<boolean | undefined> {
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
    public static async UpdateFaqPublish(publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-faq-publish", {
                uuid: uuid,
                publish: publish
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error");
        }
    }
    public static async UpdateFaqInfo(answer: string, question: string, priority: string, publish: number, category: string, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-faq", {
                uuid: uuid,
                answer: answer,
                question: question,
                priority: priority,
                publish: publish,
                category: category
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error");
        }
    }


    public static async GetFaqCategories(session_uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.get("/api/admin/get-faq-categories", {
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
    public static async GetFaqCategoryByUUID(session_uuid: string, uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.post("/api/admin/get-faq-category-by", {
                uuid: uuid
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
    public static async CreateFaqCategory(session_uuid: string, name: string, priority: string, publish: number): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/admin/faq-create-category", {
                name: name,
                priority: priority,
                publish: publish
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
    public static async DeleteFaqCategory(session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/faq-category-delete", {
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
    public static async UpdateFaqCategoryPublish(publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-faq-category-publish", {
                uuid: uuid,
                publish: publish
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error");
        }
    }
    public static async UpdateFaqCategoryInfo(name: string, priority: string, publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-faq-category-info", {
                uuid: uuid,
                name: name,
                priority: priority,
                publish: publish
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error");
        }
    }
}

export default ApiFaq
