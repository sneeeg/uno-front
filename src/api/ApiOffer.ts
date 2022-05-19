import axios, { AxiosResponse } from "axios";
import IAdminPanelOffersCategoriesList from "@/struct/admin-panel/IAdminPanelOffersCategoriesList";

class ApiOffer {
    public static async GetOffers(session_uuid: string): Promise<any[] | undefined> {
        try {
            const result = await axios.get("/api/shop/offer/get-offers", {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.data;
        } catch (e) {
            throw new Error("Error get offers");
        }
    }
    public static async GetOfferByUUID(session_uuid: string, offer_uuid: string): Promise<any | undefined> {
        try {
            const result = await axios.post("/api/shop/offer/get-offer-by", {
                offer_uuid: offer_uuid
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
    public static async CreateOffer(session_uuid: string,
                                    name: string,
                                    priority: string,
                                    publish: number,
                                    category: string,
                                    price: string,
                                    data: string,
                                    sms: string,
                                    min: string,
                                    additional_data: string,
                                    int_min: string,
                                    countries: string,
                                    rates_abroad: number,
                                    free: number,
                                    activation_info: string,
                                    display_roaming: number,
                                    overview: string,
                                    note: string,
                                    design: string,
                                    photo_list: string,
                                    photo_slide: string,
                                    photo_slide_m: string,
                                    display_offers: number,
                                    display_home: number,
                                    display_slider: number,
                                    active: number,
                                    tariff_overview: string,
                                    prospects_info: string,
                                    contract: string,
                                    shop_price: string,
                                    activation_price: string,
                                    is_porting: number,
                                    price_vodafone: string,
                                    price_others: string,
                                    title: string,
                                    description: string,
                                    keywords: string,
                                    url: string): Promise<string | undefined> {
        try {
            const result: AxiosResponse<{ response: string }> = await axios.post("/api/shop/offer/offer-create", {
                name: name,
                priority: priority,
                publish: publish,
                category: category,
                price: price,
                data: data,
                sms: sms,
                min: min,
                additional_data: additional_data,
                int_min: int_min,
                countries: countries,
                rates_abroad: rates_abroad,
                free: free,
                activation_info: activation_info,
                display_roaming: display_roaming,
                overview: overview,
                note: note,
                design: design,
                photo_list: photo_list,
                photo_slide: photo_slide,
                photo_slide_m: photo_slide_m,
                display_offers: display_offers,
                display_home: display_home,
                display_slider: display_slider,
                active: active,
                tariff_overview: tariff_overview,
                prospects_info: prospects_info,
                contract: contract,
                shop_price: shop_price,
                activation_price: activation_price,
                is_porting: is_porting,
                price_vodafone: price_vodafone,
                price_others: price_others,
                title: title,
                description: description,
                keywords: keywords,
                url: url
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
    public static async UpdateOfferInfo(name: string,
                                        priority: string,
                                        publish: number,
                                        category: string,
                                        price: string,
                                        data: string,
                                        sms: string,
                                        min: string,
                                        additional_data: string,
                                        int_min: string,
                                        countries: string,
                                        rates_abroad: number,
                                        free: number,
                                        activation_info: string,
                                        display_roaming: number,
                                        overview: string,
                                        note: string,
                                        design: string,
                                        photo_list: string,
                                        photo_slide: string,
                                        photo_slide_m: string,
                                        display_offers: number,
                                        display_home: number,
                                        display_slider: number,
                                        active: number,
                                        tariff_overview: string,
                                        prospects_info: string,
                                        contract: string,
                                        shop_price: string,
                                        activation_price: string,
                                        is_porting: number,
                                        price_vodafone: string,
                                        price_others: string,
                                        title: string,
                                        description: string,
                                        keywords: string,
                                        url: string,
                                        session_uuid: string,
                                        uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/shop/offer/offer-change", {
                name: name,
                priority: priority,
                publish: publish,
                category: category,
                price: price,
                data: data,
                sms: sms,
                min: min,
                additional_data: additional_data,
                int_min: int_min,
                countries: countries,
                rates_abroad: rates_abroad,
                free: free,
                activation_info: activation_info,
                display_roaming: display_roaming,
                overview: overview,
                note: note,
                design: design,
                photo_list: photo_list,
                photo_slide: photo_slide,
                photo_slide_m: photo_slide_m,
                display_offers: display_offers,
                display_home: display_home,
                display_slider: display_slider,
                active: active,
                tariff_overview: tariff_overview,
                prospects_info: prospects_info,
                contract: contract,
                shop_price: shop_price,
                activation_price: activation_price,
                is_porting: is_porting,
                price_vodafone: price_vodafone,
                price_others: price_others,
                title: title,
                description: description,
                keywords: keywords,
                url: url,
                uuid: uuid
            }, {
                headers: {
                    "x-tenant": "null",
                    "x-session-token": session_uuid
                }
            });
            return result.data.response;
        } catch (e) {
            throw new Error("Error get offer");
        }
    }
    public static async UpdateOfferPublish(publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/shop/offer/change-offer-publish", {
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
    public static async DeleteOffer(session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/shop/offer/delete-offer", {
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
    public static async CreateOfferCategory(session_uuid: string, name: string , priority: string, publish: number): Promise<string | undefined> {
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
    public static async UpdateOfferCategoryInfo(name: string, priority: string, publish: number, session_uuid: string, uuid: string): Promise<boolean | undefined> {
        try {
            const result = await axios.post("/api/admin/change-offer-category-info", {
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
