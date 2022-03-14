import { RouteConfig } from "vue-router";
import FaqEdit from "@/views/Faq/FaqEdit.vue";

const routes: Array<RouteConfig> = [
    {
        path: "/faq/edit",
        name: "FaqEdit",
        component: FaqEdit
    }
];

export default routes;
