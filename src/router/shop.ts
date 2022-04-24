import { RouteConfig } from "vue-router";
import Orders from "@/views/Shop/Order/Orders.vue";
import OrderView from "@/views/Shop/Order/OrderView.vue";

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
    }
];

export default routes;
