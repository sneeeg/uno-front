import { RouteConfig } from "vue-router";
import FaqQuestions from "@/views/Faq/FaqQuestions.vue";
import FaqCategories from "@/views/Faq/FaqCategories.vue";
import CreateQuestion from "@/views/Faq/CreateQuestion.vue";

const routes: Array<RouteConfig> = [
    {
        path: "/faq/questions",
        name: "FaqQuestions",
        component: FaqQuestions
    },
    {
        path: "/faq/questions/create",
        name: "CreateQuestion",
        component: CreateQuestion
    },
    {
        path: "/faq/categories",
        name: "FaqCategories",
        component: FaqCategories
    }
];

export default routes;
