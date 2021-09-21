<template>
    <div>
        <div v-if="loading">Data is loading...</div>
        <div v-else>
            <BookableListItem
                v-for="(bookable, i) in bookables"
                :item-title="bookable.title"
                :item-content="bookable.content">
                key="i"
            </BookableListItem>
        </div>
    </div>
</template>

<script>
    import BookableListItem from "./BookableListItem";

    export default {
        name: "Bookables",
        components: {
            BookableListItem
        },
        data() {
            return {
                bookables: null,
                loading: false
            }
        },
        created() {
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.bookables = [
                    {
                        title: 'Cheap Villa',
                        content: 'Very cheap villa'
                    },
                    {
                        title: 'Expensive Villa',
                        content: 'Very expensive villa'
                    }
                ]
            }, 2000)
        }
    }
</script>

<style scoped>

</style>
