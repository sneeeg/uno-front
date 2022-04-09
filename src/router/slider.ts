import { RouteConfig } from "vue-router";
import SliderList from "@/views/Slider/SliderList.vue";
import SliderCreate from "@/views/Slider/SliderCreate.vue";

const routes: Array<RouteConfig> = [
    {
        path: "/slider/slides",
        name: "SliderList",
        component: SliderList
    },
    {
        path: "/slider/create",
        name: "SliderCreate",
        component: SliderCreate
    },
];

export default routes;
