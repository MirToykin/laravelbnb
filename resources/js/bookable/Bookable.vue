<template>
    <div v-if="loading">Data is loading...</div>
    <div v-else class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <h2>{{bookable.title}}</h2>
                    <hr/>
                    <article>{{bookable.description}}</article>
                </div>
            </div>
        </div>
        <div class="col-md-4">availability & prices</div>
    </div>
</template>

<script>
    export default {
        name: "Bookable",
        data() {
            return {
                bookable: null,
                loading: false
            }
        },
        created() {
            this.loading = true
            axios.get(`/api/bookable/${this.$route.params.id}`)
                .then(response => this.bookable = response.data)
                .catch(err => console.log(err.message))
                .finally(() => this.loading = false)
        }
    }
</script>

<style scoped>

</style>
