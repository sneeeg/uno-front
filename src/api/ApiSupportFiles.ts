import axios, { AxiosResponse } from "axios";

class ApiSupportFiles {
    public static async GetFiles(session_uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.get("/api/cms/files/get-files", {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.data;
        } catch (e) {
            throw new Error("Error get files");
        }
    }
    public static async GetFileByUUID(session_uuid: string, uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.post("/api/cms/files/get-file-by", {
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
    public static async CreateFile(session_uuid: string, name: string , description: string, category: string, file: string, priority: string, publish: number): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/cms/files/create-file", {
                name: name,
                description: description,
                category: category,
                file: file,
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
    public static async DeleteFile(session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/cms/files/delete-file", {
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
    public static async UpdateFilePublish(publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/cms/files/change-file-publish", {
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
    public static async UpdateFileInfo(name: string , description: string, category: string, file: string, priority: string, publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/cms/files/change-file-info", {
                uuid: uuid,
                name: name,
                description: description,
                category: category,
                file: file,
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


    public static async GetFilesCategories(session_uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.get("/api/cms/files/get-files-categories", {
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
    public static async GetFilesCategoryByUUID(session_uuid: string, uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.post("/api/cms/files/get-files-category-by", {
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
    public static async CreateFilesCategory(session_uuid: string, name: string, priority: string, publish: number): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/cms/files/create-files-category", {
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
    public static async DeleteFilesCategory(session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/cms/files/delete-files-category", {
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
    public static async UpdateFilesCategoryPublish(publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/cms/files/change-files-category-publish", {
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
    public static async UpdateFilesCategoryInfo(name: string, priority: string, publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/cms/files/change-files-category-info", {
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

export default ApiSupportFiles
