import { RouteConfig } from "vue-router";
import Users from "@/views/AdminPanel/Users.vue";
import Companies from "@/views/AdminPanel/Companies.vue";
import EditUser from "@/views/AdminPanel/EditUser.vue";
import EditCompany from "@/views/AdminPanel/EditCompany.vue";
import Blog from "@/views/Blog/Blogs.vue";
import BlogCreate from "@/views/Blog/BlogsCreate.vue";
import BlogEdit from "@/views/Blog/BlogEdit.vue";
import Offers from "@/views/AdminPanel/Offers.vue";
import OffersCreate from "@/views/AdminPanel/OfferEdit.vue";
import OffersCategories from "@/views/AdminPanel/OffersCategories.vue";
import Options from "@/views/AdminPanel/Options.vue";

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
        path: "/admin/blog-edit/:blog_uuid",
        name: "BlogEdit",
        component: BlogEdit
    },
    {
        path: "/admin/catalog/offers",
        name: "Offers",
        component: Offers
    },
    {
        path: "/admin/catalog/offers/create",
        name: "OffersCreate",
        component: OffersCreate
    },
    {
        path: "/admin/catalog/categories",
        name: "OffersCategories",
        component: OffersCategories
    },
    {
        path: "/admin/options",
        name: "Options",
        component: Options
    }
];

export default routes;
