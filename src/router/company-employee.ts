import { RouteConfig } from "vue-router";
import CompanyEmployeeList from "@/views/Company/Employee/CompanyEmployeeList.vue";

const routes: Array<RouteConfig> = [
    {
        path: "/company/employee/list/:company_uuid",
        name: "CompanyEmployeeList",
        component: CompanyEmployeeList
    }
];

export default routes;