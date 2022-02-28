<template>
    <div class="component-container navbar-component">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">UnoCRM</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link active" to="/">
                                Главная
                            </router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <router-link class="nav-link active" to="/company/list">
                                Компании
                            </router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link active dropdown-toggle" role="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Администрирование
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <router-link class="dropdown-item" to="/admin/companies">Управление компаниями</router-link>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <router-link class="dropdown-item" to="/admin/users">Управление пользователем</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item dropdown" v-if="GetCurrentCompanyList">
                            <a class="nav-link dropdown-toggle" href="#" id="companyListDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span v-if="GetCurrentCompanyItem">({{ GetCurrentCompanyItem.id }}) {{ GetCurrentCompanyItem.name }}</span>
                                <span v-else>Выбрать компанию</span>
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
                        </li>
                        <li class="nav-item dropdown" v-if="GetCurrentSessionUser">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                               <b>{{ GetCurrentSessionUser.email }}</b>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <router-link class="dropdown-item" to="/profile/edit">Профиль</router-link>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <router-link class="dropdown-item" to="/enter/logout">Выход</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import PersonalUserItemType from "@/struct/user/PersonalUserItemType";
import CompanyTableRowType from "@/struct/company/CompanyTableRowType";

@Component({
    components: {}
})
export default class Navbar extends Vue {
    @Getter("getCurrentSessionUser") private GetCurrentSessionUser!: PersonalUserItemType | undefined;
    @Getter("getCurrentCompanyList") private GetCurrentCompanyList!: CompanyTableRowType[] | undefined;
    @Getter("getCurrentCompanyItem") private GetCurrentCompanyItem!: CompanyTableRowType | undefined;


}
</script>
