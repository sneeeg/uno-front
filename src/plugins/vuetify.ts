import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import en from "vuetify/src/locale/en";
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { en },
        current: "en"
    },
    icons: {
        iconfont: "mdi"
    }
});
