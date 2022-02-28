import { RouteConfig } from "vue-router";
import CompanyCreate from "@/views/Company/CompanyCreate.vue";
import CompanyList from "@/views/Company/CompanyList.vue";
import CompanyDashboard from "@/views/Company/CompanyDashboard.vue";
import CompanyEdit from "@/views/Company/CompanyEdit.vue";

const routes: Array<RouteConfig> = [
    {
        path: "/company/create",
        name: "CompanyCreate",
        component: CompanyCreate
    },
    {
        path: "/company/list",
        name: "CompanyList",
        component: CompanyList
    },
    {
        path: "/company/dashboard/:company_uuid",
        name: "CompanyDashboard",
        component: CompanyDashboard
    },
    {
        path: "/company/edit/:company_uuid",
        name: "CompanyEdit",
        component: CompanyEdit
    }
];

export default routes;