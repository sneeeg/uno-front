import { RouteConfig } from "vue-router";
import ProfileEdit from "@/views/Profile/ProfileEdit.vue";

const routes: Array<RouteConfig> = [
    {
        path: "/profile/edit",
        name: "ProfileEdit",
        component: ProfileEdit
    }
];

export default routes;