import VueRouter from "vue-router";
import Bookables from "./bookables/Bookables";
import Bookable from "./bookable/Bookable";
import Review from "./review/Review";

const routes = [
    {
        path: '/',
        component: Bookables,
        name: 'home'
    },
    {
        path: '/bookables/:id',
        component: Bookable,
        name: 'bookable'
    },
    {
        path: '/reviews/:id',
        component: Review,
        name: 'review'
    },
    {
        path: '/second',
        component: Bookable,
        name: 'second'
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
