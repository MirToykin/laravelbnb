<template>
    <div class="d-flex">
        <i class="fas fa-star"
            v-for="n in fullStars"
            :key="'full_ '+n"
            @click="$emit('input', n)"
        ></i>
        <i v-if="halfStar" class="fas fa-star-half-alt"></i>
        <i v-for="n in emptyStars"
           class="far fa-star"
           :key="'empty_ '+n"
           @click="$emit('input', fullStars + n)"
        ></i>
    </div>
</template>

<script>
    export default {
        name: "StarRating",
        props: {
            value: Number
        },
        computed: {
            fullStars() {
                return Math.round(this.value)
            },
            halfStar() {
                const diff = this.value - Math.floor(this.value)
                return  diff > 0 && diff < 0.5
            },
            emptyStars() {
                return 5 - Math.ceil(this.value)
            }
        }
    }
</script>

<style scoped>

</style>
