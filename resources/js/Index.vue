<template>
    <div>
        <nav class="navbar bg-white border-bottom navbar-light">
            <router-link :to="{name: 'home'}" class="navbar-brand mr-auto">LaravelBnb</router-link>
            <router-link :to="{name: 'home'}" class="btn nav-button">Basket
                <span v-if="itemsInBasket" class="badge badge-secondary">{{itemsInBasket}}</span>
            </router-link>
        </nav>
        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Index",
        computed: {
            ...mapGetters({
                itemsInBasket: 'itemsInBasket'
            })
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>
