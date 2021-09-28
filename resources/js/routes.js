import VueRouter from "vue-router";
import Example2 from "./components/Example2";
import Bookables from "./bookables/Bookables";
import Bookable from "./bookable/Bookable";

const routes = [
    {
        path: '/',
        component: Bookables,
        name: 'home'
    },
    {
        path: '/bookable/:id',
        component: Bookable,
        name: 'bookable'
    },
    {
        path: '/second',
        component: Example2,
        name: 'second'
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
