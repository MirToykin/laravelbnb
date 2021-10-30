<template>
    <div class="d-flex">
        <i class="fas fa-star" v-for="n in fullStars" :key="bookableId+'_full_ '+n"></i>
        <i v-if="halfStar" class="fas fa-star-half-alt"></i>
        <i v-for="n in emptyStars" class="far fa-star" :key="bookableId+'_empty_ '+n"></i>
    </div>
</template>

<script>
    export default {
        name: "StarRating",
        props: {
            rating: Number,
            bookableId: String
        },
        computed: {
            fullStars() {
                return Math.round(this.rating)
            },
            halfStar() {
                const diff = this.rating - Math.floor(this.rating)
                return  diff > 0 && diff < 0.5
            },
            emptyStars() {
                return 5 - Math.ceil(this.rating)
            }
        }
    }
</script>

<style scoped>

</style>
