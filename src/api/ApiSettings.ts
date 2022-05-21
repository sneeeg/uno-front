import axios from "axios";

class ApiSettings {
    public static async GetEmailNotifications(session_uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.get("/api/settings/get-email-notifications", {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.data;
        } catch (e) {
            throw new Error("Error get email notifications");
        }
    }
    public static async GetEmailNotificationByUUID(session_uuid: string, uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.post("/api/settings/get-email-notifications-by", {
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
    public static async UpdateEmailNotificationPublish(publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/settings/change-email-notifications-publish", {
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
    public static async UpdateEmailNotification(template_name: string , topic_name: string, send_to: string, file: string, publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/settings/change-email-notifications-info", {
                template_name: template_name,
                topic_name: topic_name,
                send_to: send_to,
                file: file,
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
}

export default ApiSettings
