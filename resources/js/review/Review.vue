<template>
    <div v-if="loading">
        Loading data...
    </div>
    <div v-else>
        <div v-if="alreadyExists">
            <h3>You already have a review</h3>
        </div>
        <div v-else>
            <div>
                <div class="form-group">
                    <label class="text-muted">Select the star rating (1 is worst - 5 is best)</label>
                    <star-rating v-model:value="review.rating"
                                 class="fa-3x"
                    ></star-rating>
                </div>
                <div class="form-group">
                    <label for="content" class="text-muted">Describe your experience with</label>
                    <textarea name="content" id="content" cols="30" rows="10" class="form-control"></textarea>
                </div>
                <button class="btn btn-lg btn-primary btn-block">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Review",
        data() {
            return {
                review: {
                    rating: 5,
                    content: null
                },
                existingReview: null,
                loading: false
            }
        },
        computed: {
            alreadyExists() {
                return this.existingReview !== null
            }
        },
        created() {
            this.loading = true
            axios.get(`/api/reviews/${this.$route.params.id}`)
                .then((response) => {
                    console.log('response ', response)
                    this.existingReview = response.data.data
                })
                .catch((err) => {
                    //do nothing for a while
                    console.log('error', err)
                })
                .finally(() => {
                    console.log('finally')
                    this.loading = false
                })
        }
    }
</script>

<style scoped>

</style>
