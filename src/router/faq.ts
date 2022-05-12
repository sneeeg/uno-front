import { RouteConfig } from "vue-router";
import FaqQuestions from "@/views/Faq/FaqQuestions.vue";
import FaqCategories from "@/views/Faq/FaqCategories.vue";
import CreateQuestion from "@/views/Faq/CreateQuestion.vue";
import EditQuestion from "@/views/Faq/EditQuestion.vue";

const routes: Array<RouteConfig> = [
    {
        path: "/faq",
        name: "FaqQuestions",
        component: FaqQuestions
    },
    {
        path: "/faq/create",
        name: "CreateQuestion",
        component: CreateQuestion
    },
    {
        path: "/faq/edit/:faq_uuid",
        name: "EditQuestion",
        component: EditQuestion
    },
    {
        path: "/faq/categories",
        name: "FaqCategories",
        component: FaqCategories
    }
];

export default routes;
