import { RouteConfig } from "vue-router";
import FilesList from "@/views/CMS/Files/FilesList.vue";
import FilesCreate from "@/views/CMS/Files/FilesCreate.vue";
import FilesEdit from "@/views/CMS/Files/FilesEdit.vue";
import FilesCategories from "@/views/CMS/Files/FilesCategories.vue";

const routes: Array<RouteConfig> = [
    {
        path: "/cms/files",
        name: "FaqQuestions",
        component: FilesList
    },
    {
        path: "/cms/files/create",
        name: "FilesCreate",
        component: FilesCreate
    },
    {
        path: "/cms/files/edit/:file_uuid",
        name: "FilesEdit",
        component: FilesEdit
    },
    {
        path: "/cms/files/categories",
        name: "FaqCategories",
        component: FilesCategories
    }
];

export default routes;
