<template>
    <div class="text-center error">
        <i class="fas fa-bomb"></i>
        <h1 class="mt-4">Мы обнаружили проблему...</h1>
        <h2>К сожалению мы не можем продолжить</h2>
    </div>
</template>

<script>
    export default {
        name: "FatalError"
    }
</script>

<style scoped>
    .error {
        color: #999;
        font-size: 10rem;
    }
</style>
