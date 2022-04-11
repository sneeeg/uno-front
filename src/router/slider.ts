import { RouteConfig } from "vue-router";
import SliderList from "@/views/Slider/SliderList.vue";
import SliderCreate from "@/views/Slider/SliderCreate.vue";
import SliderEdit from "@/views/Slider/SliderEdit.vue";

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
    {
        path: "/slider/edit/:slider_uuid",
        name: "SliderEdit",
        component: SliderEdit
    },
];

export default routes;
