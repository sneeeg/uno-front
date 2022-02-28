import axios, { AxiosResponse } from "axios";
import PersonalUserItemType from "@/struct/user/PersonalUserItemType";

class ApiProfile {
    public static async profileUpdate(first_name: string, last_name: string, second_name: string, phone: string, birthday: string, sex: "m" | "f", session_uuid: string): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post(
                "/api/account/profile/profile-update",
                {
                    first_name: first_name,
                    last_name: last_name,
                    second_name: second_name,
                    phone: phone,
                    birthday: birthday,
                    sex: sex,
                },
                {
                    headers: {
                        "x-tenant": "null",
                        "x-session-token": session_uuid,
                    },
                }
            );
            return result.data.response;
        } catch (e) {
            console.error(e);
            if ("response" in e && "data" in e.response && "response" in e.response.data) {
                return e.response.data.response;
            }
            return undefined;
        }
    }

    public static async emailUpdate(new_email: string, session_uuid: string): Promise<string | boolean> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post(
                "/api/account/profile/email-update",
                {
                    new_email: new_email,
                },
                {
                    headers: {
                        "x-tenant": "null",
                        "x-session-token": session_uuid,
                    },
                }
            );
            return result.data.response;
        } catch (e) {
            console.error(e);
            if ("response" in e && "data" in e.response && "response" in e.response.data) {
                return e.response.data.response;
            }
            return false;
        }
    }

    public static async passwordUpdate(old_password: string, new_password: string, session_uuid: string): Promise<string | boolean> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post(
                "/api/account/profile/password-update",
                {
                    old_password: old_password,
                    new_password: new_password,
                },
                {
                    headers: {
                        "x-tenant": "null",
                        "x-session-token": session_uuid,
                    },
                }
            );
            return result.data.response;
        } catch (e) {
            console.error(e);
            if ("response" in e && "data" in e.response && "response" in e.response.data) {
                return e.response.data.response;
            }
            return false;
        }
    }

    public static async deleteProfile(user_uuid: string | undefined, user_role: number | undefined, session_uuid: string): Promise<string | boolean> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post(
                "/api/account/profile/delete-self",
                {
                    user_uuid: user_uuid,
                    user_role: user_role,
                },
                {
                    headers: {
                        "x-tenant": "null",
                        "x-session-token": session_uuid,
                    },
                }
            );
            return result.data.response;
        } catch (e) {
            console.error(e);
            if ("response" in e && "data" in e.response && "response" in e.response.data) {
                return e.response.data.response;
            }
            return false;
        }
    }

    public static async GetUserFromEmail(session_uuid: string, email: string): Promise<PersonalUserItemType | undefined> {
        try {
            const result = await axios.get(`/api/account/get-from-email?email=${email}`,
                {
                    headers: {
                        "x-tenant": "null",
                        "x-session-token": session_uuid,
                    },
                }
            );
            return result.data.user;
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }
}

export default ApiProfile;
