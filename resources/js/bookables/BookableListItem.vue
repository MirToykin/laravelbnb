<template>
    <div>
        <h1>{{itemTitle}}</h1>
        <div>{{itemContent}}</div>
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
