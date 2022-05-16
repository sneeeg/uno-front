import { RouteConfig } from "vue-router";
import Users from "@/views/AdminPanel/Users.vue";
import Companies from "@/views/AdminPanel/Companies.vue";
import EditUser from "@/views/AdminPanel/EditUser.vue";
import EditCompany from "@/views/AdminPanel/EditCompany.vue";
import Blog from "@/views/CMS/Blog/Blogs.vue";
import BlogCreate from "@/views/CMS/Blog/BlogsCreate.vue";
import BlogEdit from "@/views/CMS/Blog/BlogEdit.vue";
import Offers from "@/views/AdminPanel/Offers.vue";
import OffersCreate from "@/views/AdminPanel/OfferCreate.vue";
import OfferEdit from "@/views/AdminPanel/OfferEdit.vue";
import OffersCategories from "@/views/AdminPanel/OffersCategories.vue";
import Options from "@/views/Shop/Options/Options.vue";

const routes: Array<RouteConfig> = [
    {
        path: "/admin/users",
        name: "AdminUsers",
        component: Users
    },
    {
        path: "/admin/companies",
        name: "AdminCompanies",
        component: Companies
    },
    {
        path: "/admin/edit-user/:user_uuid",
        name: "EditUser",
        component: EditUser
    },{
        path: "/admin/edit-company/:company_uuid",
        name: "EditCompanies",
        component: EditCompany
    },
    {
        path: "/admin/blog",
        name: "Blog",
        component: Blog
    },
    {
        path: "/admin/blog/create",
        name: "BlogCreate",
        component: BlogCreate
    },
    {
        path: "/admin/blog/edit/:blog_uuid",
        name: "BlogEdit",
        component: BlogEdit
    },
    {
        path: "/shop/offers",
        name: "Offers",
        component: Offers
    },
    {
        path: "/shop/offers/create",
        name: "OffersCreate",
        component: OffersCreate
    },
    {
        path: "/shop/offers/edit/:offer_uuid",
        name: "OfferEdit",
        component: OfferEdit
    },
    {
        path: "/shop/offers/categories",
        name: "OffersCategories",
        component: OffersCategories
    }
];

export default routes;
