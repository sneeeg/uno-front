import { RouteConfig } from "vue-router";
import FeedbackContacts from "@/views/CMS/Feedback/FeedbackContacts.vue";
import FeedbackPartners from "@/views/CMS/Feedback/FeedbackPartners.vue";

const routes: Array<RouteConfig> = [
    {
        path: "/cms/feedback/contacts",
        name: "FeedbackContacts",
        component: FeedbackContacts
    },
    {
        path: "/cms/feedback/contacts/view/:message_uuid",
        name: "FeedbackContacts",
        component: FeedbackContacts
    },
    {
        path: "/cms/feedback/partners",
        name: "FeedbackPartners",
        component: FeedbackPartners
    },
    {
        path: "/cms/feedback/partners/view/:message_uuid",
        name: "FeedbackPartners",
        component: FeedbackPartners
    },
];

export default routes;
