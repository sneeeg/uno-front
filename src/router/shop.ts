import { RouteConfig } from "vue-router";
import Orders from "@/views/Shop/Order/Orders.vue";
import OrderView from "@/views/Shop/Order/OrderView.vue";
import Options from "@/views/Shop/Options/Options.vue";
import OptionsCreate from "@/views/Shop/Options/OptionsCreate.vue";
import OptionsEdit from "@/views/Shop/Options/OptionsEdit.vue";

const routes: Array<RouteConfig> = [
    {
        path: "/shop/orders",
        name: "Orders",
        component: Orders
    },
    {
        path: "/shop/orders/view",
        name: "OrderView",
        component: OrderView
    },

    {
        path: "/shop/options",
        name: "Options",
        component: Options
    },
    {
        path: "/shop/options/create",
        name: "OptionsCreate",
        component: OptionsCreate
    },
    {
        path: "/shop/options/edit/:option_uuid",
        name: "OptionsEdit",
        component: OptionsEdit
    },
];

export default routes;
