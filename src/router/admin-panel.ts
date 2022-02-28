import { RouteConfig } from "vue-router";
import Users from "@/views/AdminPanel/Users.vue";
import Companies from "@/views/AdminPanel/Companies.vue";
import EditUser from "@/views/AdminPanel/EditUser.vue";
import EditCompany from "@/views/AdminPanel/EditCompany.vue";

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
];

export default routes;
