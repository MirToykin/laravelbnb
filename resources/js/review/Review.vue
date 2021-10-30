<template>
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
</template>

<script>
    export default {
        name: "Review",
        data() {
            return {
                review: {
                    rating: 5,
                    content: null
                }
            }
        }
    }
</script>

<style scoped>

</style>
