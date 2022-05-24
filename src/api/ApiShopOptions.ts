import axios, { AxiosResponse } from "axios";

class ApiShopOptions {
    public static async GetOptions(session_uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.get("/api/shop/options/get-options", {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.data;
        } catch (e) {
            throw new Error("Error get options");
        }
    }
    public static async GetOptionByUUID(session_uuid: string, uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.post("/api/shop/options/get-option-by", {
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
    public static async CreateOption(session_uuid: string, name: string , priority: string, publish: number, type: string, price: string, period: string, value: string, measure: string, connect: string, link_for_button: string, limits: string, overview: string, note: string, bss: string, seo_title: string, seo_description: string, seo_keywords: string, seo_url: string): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/shop/options/create-option", {
                name: name,
                priority: priority,
                publish: publish,
                type: type,
                price: price,
                period: period,
                value: value,
                measure: measure,
                connect: connect,
                link_for_button: link_for_button,
                limits: limits,
                overview: overview,
                note: note,
                bss: bss,
                seo_title: seo_title,
                seo_description: seo_description,
                seo_keywords: seo_keywords,
                seo_url: seo_url
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
    public static async UpdateOptionPublish(publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/shop/options/change-option-publish", {
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
    public static async UpdateOptionInfo(name: string , priority: string, publish: number, type: string, price: string, period: string, value: string, measure: string, connect: string, link_for_button: string, limits: string, overview: string, note: string, bss: string, seo_title: string, seo_description: string, seo_keywords: string, seo_url: string, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/shop/options/change-option-info", {
                uuid: uuid,
                name: name,
                priority: priority,
                publish: publish,
                type: type,
                price: price,
                period: period,
                value: value,
                measure: measure,
                connect: connect,
                link_for_button: link_for_button,
                limits: limits,
                overview: overview,
                note: note,
                bss: bss,
                seo_title: seo_title,
                seo_description: seo_description,
                seo_keywords: seo_keywords,
                seo_url: seo_url
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
    public static async DeleteOption(session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/shop/options/delete-option", {
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
}

export default ApiShopOptions
