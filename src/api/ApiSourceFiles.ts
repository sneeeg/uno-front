import axios, { AxiosResponse } from "axios";

class ApiSourceFiles {
    public static async GetFiles(session_uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.get("/api/cms/source-files/get-files", {
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
            const result = await axios.post("/api/cms/source-files/get-files-by", {
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
    public static async CreateFile(session_uuid: string, file_name: string , description: string, publish: number): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/cms/source-files/create-file", {
                file_name: file_name,
                description: description,
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
    public static async UpdateFilePublish(publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/cms/source-files/change-file-publish", {
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
    public static async UpdateFileInfo(file_name: string , description: string, publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/cms/source-files/change-file-info", {
                file_name: file_name,
                description: description,
                publish: publish,
                uuid: uuid
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
    public static async DeleteFile(session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/cms/source-files/delete-file", {
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

export default ApiSourceFiles
