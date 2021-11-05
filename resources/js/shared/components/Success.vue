<template>
  <div class="text-center success-result">
    <i class="far fa-thumbs-up"></i>
    <h1 class="mt-4">Успех!</h1>
    <h2><slot></slot></h2>
  </div>
</template>

<script>
export default {
  name: "Success",
};
</script>

<style scoped>
.success-result {
  color: #999;
  font-size: 10rem;
}
</style>
