<template>
    <div class="page-container">
        <standart-template>
            <div class="container">
                <div class="row mt-1">
                    <v-breadcrumbs :items="Breadcrumbs" divider="/"/>
                    <page-header title="Blog Page"></page-header>
                </div>
                <div class="row mt-4">
                    <div class="col-1">
                        <router-link to="/admin/blog/create">
                            <v-btn
                                depressed
                                color="primary">
                                Create blog
                            </v-btn>
                        </router-link>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-12">
                        <div class="well">
                            <div class="row">
                                <div class="col-12 text-center" v-if="BlogsItems.length === 0">
                                    <p>Blog is empty</p>
                                </div>
                                <v-col
                                    v-else
                                    cols="4"
                                    v-for="card in BlogsItems"
                                    :key="card.id"
                                >
                                    <v-card>
                                        <v-img
                                            height="150"
                                            :src="card.image"
                                        ></v-img>
                                        <v-card-title>{{ card.title }}</v-card-title>
                                        <v-card-actions class="d-flex justify-space-between">
                                            <router-link :to="{ name: 'BlogEdit', params: { blog_uuid: card.uuid } }">
                                                <v-btn
                                                    color="primary"
                                                    depressed
                                                >
                                                    Edit
                                                </v-btn>
                                            </router-link>
                                            <v-btn
                                                icon
                                                small
                                                @click="DeleteBlog(card.uuid)">
                                                <v-icon small>
                                                    fas fa-trash
                                                </v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </div>
                        </div>
                    </div>
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

    private BlogsItems: any = [];

    private async GetBlogs(): Promise<void> {
        try {
            this.BlogsItems = await ApiAdmin.GetBlog(ApiEnter.CurrentSessionUUID as string);
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
}
</script>
