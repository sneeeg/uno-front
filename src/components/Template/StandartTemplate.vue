<template>
    <div class="template-container standart-template">
        <div class="left-wrapper">
            <div class="logo">
                <img src="@/assets/img/logo.svg" alt="logo">
            </div>

            <div class="menu-wrapper">
                <div class="menu-category">
                    <div class="menu-items">
                        <router-link to="/" class="menu-item" exact>
                            <i class="fas fa-home"></i> Home
                        </router-link>
<!--                        <router-link to="/company/list" class="menu-item">
                            <i class="fas fa-bars"></i> Companies
                        </router-link>-->
                    </div>
                </div>
                <div class="menu-category" v-if="GetCurrentCompanyItem != undefined">
                    <div class="name">компания</div>
                    <div class="menu-items">
                        <router-link :to="'/company/edit/' + GetCurrentCompanyItem.uuid" class="menu-item">
                            <i class="fas fa-cogs"></i> Настройки компании
                        </router-link>
                        <router-link :to="'/company/employee/list/' + GetCurrentCompanyItem.uuid" class="menu-item">
                            <i class="fas fa-users"></i> Управ. сотрудниками
                        </router-link>
                    </div>
                </div>
                <div class="menu-category" v-if="GetCurrentSessionUser.system_role == SystemRole.Admin || GetCurrentSessionUser.system_role == SystemRole.SuperAdmin">
                    <div class="name">CMS</div>
                    <div class="menu-items">
                        <router-link to="/faq" class="menu-item">
                            <i class="fas fa-question"></i> Support (FAQ)
                        </router-link>
                        <router-link to="/cms/files" class="menu-item">
                            <i class="far fa-file"></i> Support (Files)
                        </router-link>
                        <router-link to="/admin/blog" class="menu-item">
                            <i class="fas fa-paste"></i> Blog
                        </router-link>
                        <router-link to="/slider/slides" class="menu-item">
                            <i class="far fa-square"></i> Slider
                        </router-link>
                        <router-link to="/cms/source-files" class="menu-item">
                            <i class="far fa-file"></i> Source files for content
                        </router-link>
                        <router-link to="/cms/feedback/contacts" class="menu-item">
                            <i class="far fa-envelope-open"></i> Feedback messages
                        </router-link>
                    </div>
                    <div class="name">E-SHOP</div>
                    <div class="menu-items">
                        <router-link to="/shop/offers" class="menu-item">
                            <i class="fab fa-buffer"></i> Offers
                        </router-link>
                        <router-link to="/shop/options" class="menu-item">
                            <i class="fas fa-cogs"></i> Options and Extras
                        </router-link>
                        <router-link to="/shop/orders" class="menu-item">
                            <i class="fas fa-shopping-cart"></i> Order management
                        </router-link>
                    </div>
                    <div class="name">Settings</div>
                    <div class="menu-items">
                        <!--                        <router-link to="/admin/companies" class="menu-item">
                                                    <i class="fas fa-building"></i> Управ. компаниями
                                                </router-link>-->
                        <router-link to="/admin/users" class="menu-item">
                            <i class="fas fa-users-cog"></i> Users managment
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-wrapper">
            <div class="top-bar">
<!--                <div class="dropdown company-list">
                    <a class="nav-link dropdown-toggle" href="#" id="companyListDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span v-if="GetCurrentCompanyItem">({{ GetCurrentCompanyItem.id }}) {{ GetCurrentCompanyItem.name }} <i class="fas fa-angle-down"></i></span>
                        <span v-else>Выбрать компанию <i class="fas fa-angle-down"></i></span>

                    </a>
                    <ul class="dropdown-menu" aria-labelledby="companyListDropdown">
                        <li v-for="(item) in GetCurrentCompanyList" :key="'nav_' + item.uuid">
                            <router-link class="dropdown-item" :to="'/company/dashboard/' + item.uuid">({{ item.id }}) {{ item.name }}</router-link>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/company/create">Создать компанию</router-link>
                        </li>
                    </ul>
                </div>-->
                <div class="dropdown user-bar">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div>
                           <div> {{ IsLoginOnAdminPanel ? "Вы управляете пользователем" : "" }} {{ GetCurrentSessionUser.email }} <i class="fas fa-angle-down"></i></div>
                            <div class="item-login text-danger" v-if="IsLoginOnAdminPanel">Ваш аккаунт - {{UserOnLogin.email}}</div>
                        </div>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <router-link class="dropdown-item" to="/profile/edit">Профиль</router-link>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/enter/logout">{{ IsLoginOnAdminPanel ? `Вернуться на аккаунт ${UserOnLogin.email}` : 'Выход' }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="content-wrapper">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";
import PersonalUserItemType from "@/struct/user/PersonalUserItemType";
import EUserEnum from "@/struct/user/EUserEnum";
import ApiEnter from "@/api/ApiEnter";

@Component({
    components: {}
})
export default class StandartTemplate extends Vue {
    @Getter("getCurrentCompanyItem") private GetCurrentCompanyItem!: CompanyTableRowType | undefined;
    @Getter("getCurrentSessionUser") private GetCurrentSessionUser!: PersonalUserItemType | undefined;
    @Getter("getCurrentCompanyList") private GetCurrentCompanyList!: CompanyTableRowType[] | undefined;
    private SystemRole = EUserEnum.SystemRole;

    private async IsLoggedOn(): Promise<void> {
        const token_old = localStorage.getItem("XSessionUUIDOLD");


        if (token_old) {

            this.UserOnLogin  = await ApiEnter.GetUserFromSession(token_old as string)

            this.IsLoginOnAdminPanel = true;
        }
    }


    private IsLoginOnAdminPanel: boolean = false;
    private UserOnLogin!: PersonalUserItemType | undefined

    private created() {
        this.IsLoggedOn()
    }
}
</script>
<style lang="less">
.item-login {
    font-size: 12px;
}
</style>
