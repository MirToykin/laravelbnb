<template>
    <div class="row">
        <div :class="{
            'col-md-4': loading || !alreadyReviewed,
            'd-none': !loading && alreadyReviewed
        }">
            <div class="card">
                <div class="card-body" v-if="booking">
                    <div v-if="loading">
                        Loading...
                    </div>
                    <div v-else>
                        <p>Вы останавливались в <router-link :to="{name: 'bookable', params: {id: booking.bookable.bookable_id}}">{{booking.bookable.title}}</router-link></p>
                        <div>c {{booking.from}} по {{booking.to}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="{
            'col-md-8': loading || !alreadyReviewed,
            'col-md-12': !loading && alreadyReviewed
        }">
            <div v-if="loading">
                Loading data...
            </div>
            <div v-else>
                <div v-if="alreadyReviewed">
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
                loading: false,
                booking: null
            }
        },
        computed: {
            alreadyReviewed() {
                return this.hasReview || !this.hasBooking
            },
            hasReview() {
                return this.existingReview !== null
            },
            hasBooking() {
                return this.booking !== null
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
                    if (err.response && err.response.status && err.response.status === 404) {
                        axios.get(`/api/booking-by-review/${this.$route.params.id}`)
                            .then((response) => {
                                this.booking = response.data.data
                            })
                    }
                })
                .finally(() => {
                    this.loading = false
                })
        }
    }
</script>

<style scoped>

</style>
