import router from "./routes";
import VueRouter from "vue-router";
import Index from "./Index";
import moment from "moment";
import StarRating from "./shared/components/StarRating";

require('./bootstrap');

window.Vue = require('vue');

Vue.use(VueRouter)
Vue.filter('fromNow', (value) => moment(value).locale('ru').fromNow())
Vue.component('star-rating', StarRating)

const app = new Vue({
    el: '#app',
    router,
    template: '<index/>',
    components: {
        index: Index
    }
});
