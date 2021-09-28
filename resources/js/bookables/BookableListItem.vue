<template>
    <div class="card mb-4 w-100">
        <div class="card-body">
            <h5 class="card-title">{{itemTitle}}</h5>
            <hr class="dropdown-divider">
            <p class="card-text">{{itemContent}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BookableListItem",
        props: {
            itemTitle: String,
            itemContent: String
        }
    }
</script>

<style scoped>

</style>
