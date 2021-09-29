<template>
    <div v-if="loading">Data is loading...</div>
    <div v-else class="row">
        <div class="col-md-8 pb-4">
            <div class="card">
                <div class="card-body">
                    <h2>{{bookable.title}}</h2>
                    <hr/>
                    <article>{{bookable.description}}</article>
                </div>
            </div>
        </div>
        <div class="col-md-4 pb-4"><availability></availability></div>
    </div>
</template>

<script>
    import Availability from "./Availability";

    export default {
        name: "Bookable",
        data() {
            return {
                bookable: null,
                loading: false
            }
        },
        components: {
            Availability
        },
        created() {
            this.loading = true
            axios.get(`/api/bookables/${this.$route.params.id}`)
                .then(response => this.bookable = response.data.data)
                .catch(err => console.log(err.message))
                .finally(() => this.loading = false)
        }
    }
</script>

<style scoped>

</style>
