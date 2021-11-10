<template>
  <div>
    <h6 class="text-uppercase text-secondary font-weight-bolder">
      Check Availability
      <transition name="fade">
        <span v-if="noAvailability" class="text-danger">(NOT AVAILABLE)</span>
        <span v-if="hasAvailability" class="text-success">(AVAILABLE)</span>
      </transition>
    </h6>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="from">From</label>
        <input
          type="text"
          name="from"
          id="from"
          class="form-control form-control-sm"
          placeholder="Start date"
          v-model="lastSearch.from"
          @keyup.enter="check"
          :class="{ 'is-invalid': errorFor('from') }"
        />
        <validation-errors :errors="errorFor('from')"></validation-errors>
      </div>
      <div class="form-group col-md-6">
        <label for="to">To</label>
        <input
          type="text"
          name="to"
          id="to"
          class="form-control form-control-sm"
          placeholder="End date"
          v-model="lastSearch.to"
          @keyup.enter="check"
          :class="{ 'is-invalid': errorFor('to') }"
        />
        <validation-errors :errors="errorFor('to')"></validation-errors>
      </div>
      <button
        @click="check"
        :disabled="loading"
        class="btn btn-secondary btn-block"
      >
        <span v-if="loading"
          ><i class="fas fa-circle-notch fa-spin"></i> Checking...</span
        >
        <span v-if="!loading">Check</span>
      </button>
    </div>
  </div>
</template>

<script>
import { is422 } from "../shared/utils/response";
import errorsValidation from "../shared/mixins/errorsValidation";
import { mapState } from "vuex";

export default {
  mixins: [errorsValidation],
  name: "Availability",
  props: {
    bookableId: [String, Number],
  },
  data() {
    return {
      status: null,
      loading: false,
    };
  },
  methods: {
    async check() {
      this.loading = true;
      this.errors = null;

      this.$store.dispatch("setLastSearch", {
        from: this.lastSearch.from,
        to: this.lastSearch.to,
      });

      try {
        this.status = (
          await axios.get(
            `/api/bookables/${this.bookableId}/availability?from=${this.lastSearch.from}&to=${this.lastSearch.from}`
          )
        ).status;
        this.$emit("availability", this.hasAvailability);
      } catch (err) {
        if (is422(err)) {
          this.errors = err.response.data.errors;
        }
        //todo предусмотреть проверку наличия response и status
        this.status = err.response.status;

        this.$emit("availability", this.hasAvailability);
      }

      this.loading = false;
    },
  },
  computed: {
    hasErrors() {
      return this.status === 422 && this.errors !== null;
    },
    hasAvailability() {
      return this.status === 200;
    },
    noAvailability() {
      return this.status === 404;
    },
    ...mapState({
      lastSearch: (state) => state.lastSearch,
    }),
  },
};
</script>

<style scoped>
label {
  font-weight: bolder;
  color: grey;
  text-transform: uppercase;
  font-size: 0.7rem;
}
</style>
