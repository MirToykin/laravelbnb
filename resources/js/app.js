import router from "./routes";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Index from "./Index";
import moment from "moment";
import storeDefinition from "./store";
import StarRating from "./shared/components/StarRating";
import FatalError from "./shared/components/FatalError";
import ValidationErrors from "./shared/components/ValidationErrors"
import Success from "./shared/components/Success"

require('./bootstrap');

window.Vue = require('vue');
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.filter('fromNow', (value) => moment(value).locale('ru').fromNow())
Vue.component('star-rating', StarRating)
Vue.component('fatal-error', FatalError)
Vue.component('validation-errors', ValidationErrors)
Vue.component('success-result', Success)

const store = new Vuex.Store(storeDefinition)

const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<index/>',
    components: {
        index: Index
    },
    async beforeCreate() {
        this.$store.dispatch('loadStoredState').then(() =>{})

        // await axios.get('/sanctum/csrf-cookie')
        // await axios.post('/login', {
        //     email: 'kolby.bogan@example.org',
        //     password: 'password'
        // })

        await axios.get('/user')
    }
});
