import axios, { AxiosResponse } from "axios";
import IAdminPanelCompanyList from "@/struct/admin-panel/IAdminPanelCompanyList";

class ApiBlog {
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
    public static async CreateBlog(session_uuid: string, title: string | boolean, date: string, publish: number, image1: string, image2: string, card_design: string, content: string | boolean, seo_description: string, seo_keywords: string, seo_url: string): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/admin/create-blog", {
                title: title,
                date: date,
                publish: publish,
                image1: image1,
                image2: image2,
                card_design: card_design,
                content: content,
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
    public static async GetBlogByUUID(session_uuid: string, blog_uuid: string): Promise<any[] | undefined> {
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
    public static async UpdateBlogInfo(title: string | boolean, date: string, publish: number, image1: string, image2: string, card_design: string, content: string | boolean, seo_description: string, seo_keywords: string, seo_url: string, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-blog-info", {
                title: title,
                date: date,
                publish: publish,
                image1: image1,
                image2: image2,
                card_design: card_design,
                content: content,
                seo_description: seo_description,
                seo_keywords: seo_keywords,
                seo_url: seo_url,
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
    public static async UpdateBlogPublish(publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-blog-publish", {
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
}

export default ApiBlog
