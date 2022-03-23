import { RouteConfig } from "vue-router";
import Users from "@/views/AdminPanel/Users.vue";
import Companies from "@/views/AdminPanel/Companies.vue";
import EditUser from "@/views/AdminPanel/EditUser.vue";
import EditCompany from "@/views/AdminPanel/EditCompany.vue";
import Blog from "@/views/AdminPanel/Blogs.vue";
import BlogCreate from "@/views/AdminPanel/BlogsCreate.vue";
import BlogEdit from "@/views/AdminPanel/BlogEdit.vue";

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
    }
];

export default routes;
