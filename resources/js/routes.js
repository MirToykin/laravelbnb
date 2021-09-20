import ExampleComponent from "./components/ExampleComponent";
import VueRouter from "vue-router";
import Example2 from "./components/Example2";

const routes = [
    {
        path: '/',
        component: ExampleComponent
    },
    {
        path: '/second',
        component: Example2
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
