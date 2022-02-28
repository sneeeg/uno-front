import PersonalUserItemType from "@/struct/user/PersonalUserItemType";
import axios, { AxiosResponse } from "axios";

class ApiEnter {
    public static CurrentSessionUUID: string | undefined = undefined;

    public static async Login(email: string, password: string): Promise<string | undefined> {
        const result = await axios.post<{ session_uuid: string, user: PersonalUserItemType }>("/api/account/enter/login", {
            email: email,
            password: password
        }, {
            headers: {
                "x-tenant": "null"
            }
        });
        return result.data.session_uuid;
    }

    public static async Registration(email: string, password: string): Promise<string | undefined> {
        const result = await axios.post<{ response: { user_uuid: string, email: string } }>("/api/account/enter/registration", {
            email: email,
            password: password,
            first_name: "",
            last_name: "",
            second_name: "",
            sex: "n"
        }, {
            headers: {
                "x-tenant": "null"
            }
        });
        return result.data.response.user_uuid;
    }

    public static async GetUserFromSession(session_uuid: string): Promise<PersonalUserItemType | undefined> {
        const result: AxiosResponse<{ response: PersonalUserItemType }> = await axios.get("/api/account/enter/current-session", {
            headers: {
                "x-tenant": "null",
                "x-session-token": session_uuid
            }
        });
        return result.data.response;
    }

    public static async Logout(session_uuid: string): Promise<PersonalUserItemType | undefined> {
        const result: AxiosResponse<{ response: PersonalUserItemType }> = await axios.post("/api/account/enter/logout", {}, {
            headers: {
                "x-tenant": "null",
                "x-session-token": session_uuid
            }
        });
        return result.data.response;
    }
}

export default ApiEnter;