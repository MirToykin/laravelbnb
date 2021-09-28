<template>
    <div>
        <div v-if="loading">Data is loading...</div>
        <div v-else>
            <div
                v-for="row in rows"
                class="row"
                :key="row+'-1'"
            >
                <div
                    v-for="(item, key) in getRowItems(row)"
                    class="col d-flex align-items-stretch"
                    :key="`row_${row}:col_${key}`"
                >
                    <BookableListItem
                        :item-title="item.title"
                        :item-content="item.description">
                    </BookableListItem>
                </div>
                <div
                    class="col" v-for="n in itemPlaceholders(row)"
                    :key="`ph:row-${row}:i-${n}`"
                ></div>
            </div>
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
                loading: false,
                columns: 3
            }
        },
        created() {
            this.loading = true
            axios.get('/api/bookables')
                .then(response => {
                    this.bookables = response.data
                    this.loading = false
                })
                .catch(error => console.log(error.message))
        },
        computed: {
            rows() {
                return this.bookables ? Math.ceil(this.bookables.length/this.columns) : 0
            }
        },
        methods: {
            getRowItems(row) {
                return this.bookables.slice((row - 1) * this.columns, row * this.columns)
            },
            itemPlaceholders(row) {
                return this.columns - this.getRowItems(row).length
            }
        }
    }
</script>

<style scoped>

</style>
