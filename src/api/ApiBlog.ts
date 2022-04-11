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
    public static async CreateBlog(session_uuid: string, title: string | boolean, publish: number, image: string | boolean, content: string | boolean): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/admin/create-blog", {
                title: title,
                publish: publish,
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
    public static async UpdateBlogInfo(title: string | boolean, publish: number, image: string | boolean, content: string | boolean, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-blog-info", {
                title: title,
                publish: publish,
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
