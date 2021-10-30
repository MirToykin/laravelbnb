<template>
    <div>
        <div class="d-flex justify-content-between align-items-center pt-4">
            <h6 class="text-uppercase text-secondary font-weight-bolder">Review List</h6>
            <star-rating class="fa-lg" :rating="averageRating" bookable-id="0"></star-rating>
        </div>

        <div v-if="loading">Loading data...</div>
        <div>
            <div class="border-bottom d-none d-md-block" v-for="(review, i) in reviews" :key="'review'+i">
                <div class="row pt-4">
                    <div class="col-md-6">John Doe</div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <star-rating :bookable-id="bookableId" :rating="review.rating"></star-rating>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">{{review.created_at | fromNow}}</div>
                </div>
                <div class="row pt-4 pb-4">
                    <div class="col-md-12">{{review.content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReviewList",
        props: {
            bookableId: String
        },
        data() {
            return {
                reviews: null,
                loading: false
            }
        },
        computed: {
            averageRating() {
                if (this.reviews) {
                    const sum = this.reviews.map((review) => review.rating).reduce((prev, current, arr) => prev + current, 0)
                    return sum/this.reviews.length
                }
                return 0;
            }
        },
        created() {
            this.loading = true
            axios.get(`/api/bookables/${this.bookableId}/reviews`).then((response => {
                this.reviews = response.data.data
            }))
            .catch(error => {
                console.log(error)
            })
            .finally(() => this.loading = false)
        }
    }
</script>

<style scoped>

</style>
