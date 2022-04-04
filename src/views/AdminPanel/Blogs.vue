<template>
    <div class="page-container">
        <standart-template>
            <div class="container">
                <div class="row mt-1">
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                    <page-header title="Posts" back-url="/"/>
                </div>
                <div class="col-12">
                    <v-divider></v-divider>
                </div>
                <div class="col-12">
                    <router-link to="/admin/blog/create">
                        <v-btn
                            color="orange accent-4"
                            class="white--text"
                            small
                            depressed
                            @click="DialogToggle">
                            Add post
                        </v-btn>
                    </router-link>
                </div>
                <div class="col-12">
                    <v-data-table dense :headers="TableHeaders" :items="TableItems" :items-per-page="15" item-key="offer" class="elevation-1">
                        <template v-slot:item.create_at="{ item }">
                            {{ formatDate(item.create_at) }}
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-switch hide-details :input-value="item.is_show" class="mt-0"></v-switch>
                                <v-btn icon @click="editPost(item.uuid)">
                                    <v-icon small color="grey darken-2">
                                        fas fa-pencil-alt
                                    </v-icon>
                                </v-btn>
                                <v-btn icon @click="() => console.log('del')">
                                    <v-icon small color="red darken-3">
                                        far fa-trash-alt
                                    </v-icon>
                                </v-btn>
                            </div>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </standart-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BreadcrumbsItemType from "@/struct/ui/breadcrumbs/BreadcrumbsItemType";
import sweetalert from "sweetalert";
import ApiEnter from "@/api/ApiEnter";
import ApiAdmin from "@/api/ApiAdmin";
import StandartTemplate from "@/components/Template/StandartTemplate.vue";
import LeftMenuTab from "@/components/LeftMenu/LeftMenuTab.vue";
import PageHeader from "@/components/UI/PageHeader.vue";
import TableHeaderItemType from "@/struct/ui/Table/TableHeaderItemType";
import DataBlogCreate from "@/data/AdminPanel/DataBlogCreate";
import dayjs from "dayjs";


@Component({
    components: { PageHeader, StandartTemplate, LeftMenuTab },
})

export default class Blog extends Vue {

    public Breadcrumbs: BreadcrumbsItemType[] = [
        {
            to: '/',
            text: 'Главная'
        },
        {
            to: '/blog',
            text: 'Blog',
            disabled: true
        }
    ];

    private TableHeaders: TableHeaderItemType[] = DataBlogCreate.TableHeaders;

    private TableItems: any[] | undefined = [];

    private async GetBlogs(): Promise<void> {
        try {
            this.TableItems = await ApiAdmin.GetBlog(ApiEnter.CurrentSessionUUID as string);
            console.log(this.TableItems)
        } catch (e) {
            console.error(e);
        }
    }

    private DeleteBlog(blog_uuid: string): void {
        sweetalert({
            title: "Are you sure?",
            text: "Вы дейсвительно хотите удалить статью?",
            icon: "warning",
            buttons: ["No", "Yes"]
        }).then(async isConfirm => {
            if (isConfirm == true) {
                const response = await ApiAdmin.DeleteBlog(ApiEnter.CurrentSessionUUID as string, blog_uuid);
                if (typeof response == "boolean") {
                    sweetalert({
                        title: "Success!",
                        text: "Статья удалена",
                        icon: "success"
                    });

                    this.GetBlogs()
                } else {
                    sweetalert({
                        title: "Ошибка!",
                        text: `Во время выполнения запроса, возникла ошибка: ${response}`,
                        icon: "error"
                    });
                }
            }
        });
    }

    private created(): void {
        this.GetBlogs()
    }

    private formatDate(item: string) {
        return dayjs(item).format('DD.MM.YYYY')
    }
}
</script>
