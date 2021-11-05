<template>
  <div>
    <div v-for="(error, i) in errors" :key="key(i)" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>
<script>
export default {
  props: ["errors"],
  methods: {
    key(index) {
      return `error_${index}_${Math.random()}`;
    },
  },
};
</script>
<style scoped>
.invalid-feedback {
  color: #b22222;
}
.form-control.is-invalid ~ div > .invalid-feedback {
  display: block;
}
.is-invalid {
  border-color: #b22222;
  background-image: none;
}
</style>