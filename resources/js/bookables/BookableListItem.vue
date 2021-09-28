<template>
    <div class="card mb-4 w-100">
        <div class="card-body">
            <router-link :to="{name: 'bookable', params: {id}}">
                <h5 class="card-title">{{title}}</h5>
            </router-link>
            <hr class="dropdown-divider">
            <p class="card-text">{{description}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BookableListItem",
        props: {
            title: String,
            description: String,
            id: Number
        }
    }
</script>

<style scoped>

</style>
