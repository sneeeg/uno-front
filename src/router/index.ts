import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/Enter/Login.vue";
import Logout from "@/views/Enter/Logout.vue";
import Registration from "@/views/Enter/Registration.vue";
import ForgotPassword from "@/views/Enter/ForgotPassword.vue";
import company from "@/router/company";
import companyEmployee from "@/router/company-employee";
import profile from "@/router/profile";
import adminPanel from "@/router/admin-panel";
import faq from "@/router/faq";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/enter/login",
        name: "EnterLogin",
        component: Login
    },
    {
        path: "/enter/login/:email",
        name: "EnterLoginFromEmail",
        component: Login
    },
    {
        path: "/enter/logout",
        name: "EnterLogout",
        component: Logout
    },
    {
        path: "/enter/registration",
        name: "EnterRegistration",
        component: Registration
    },
    {
        path: "/enter/forgot-password",
        name: "EnterForgotPassword",
        component: ForgotPassword
    },
    ...company,
    ...companyEmployee,
    ...profile,
    ...adminPanel,
    ...faq
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
