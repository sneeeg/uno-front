import axios, { AxiosResponse } from "axios";
import IAdminPanelOffersCategoriesList from "@/struct/admin-panel/IAdminPanelOffersCategoriesList";

class ApiOffer {
    public static async GetOfferCategories(session_uuid: string): Promise<IAdminPanelOffersCategoriesList[] | undefined> {
        try {
            const result = await axios.get("/api/admin/get-offer-categories", {
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
    public static async GetOfferCategoryByUUID(session_uuid: string, offer_category_uuid: string): Promise<IAdminPanelOffersCategoriesList[] | undefined> {
        try {
            const result = await axios.post("/api/admin/get-offer-category-by", {
                offer_category_uuid: offer_category_uuid
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
    public static async CreateOfferCategory(session_uuid: string, name: string , publish: number, priority: string): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/admin/offer-create-category", {
                name: name,
                publish: publish,
                priority: priority
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
    public static async UpdateOfferCategoryPublish(publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-offer-category-publish", {
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
    public static async DeleteOfferCategory(session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/delete-offer-category", {
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

export default ApiOffer
