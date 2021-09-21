import router from "./routes";
import VueRouter from "vue-router";
import Index from "./Index";

require('./bootstrap');

window.Vue = require('vue');

Vue.use(VueRouter)

const app = new Vue({
    el: '#app',
    router,
    template: '<index/>',
    components: {
        index: Index
    }
});
