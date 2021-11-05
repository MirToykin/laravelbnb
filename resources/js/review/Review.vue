<template>
  <div v-if="success || error">
    <fatal-error v-if="error"></fatal-error>
    <success-result v-if="success">Ваш отзыв отправлен</success-result>
  </div>
  <div v-else class="row">
    <div
      :class="{
        'col-md-4': twoColumns,
        'd-none': oneColumn,
      }"
    >
      <div class="card">
        <div class="card-body" v-if="booking">
          <div v-if="loading">Loading...</div>
          <div v-else>
            <p>
              Вы останавливались в
              <router-link
                :to="{
                  name: 'bookable',
                  params: { id: booking.bookable.bookable_id },
                }"
              >
                {{ booking.bookable.title }}
              </router-link>
            </p>
            <div>c {{ booking.from }} по {{ booking.to }}</div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{
        'col-md-8': twoColumns,
        'col-md-12': oneColumn,
      }"
    >
      <div v-if="loading">Loading data...</div>
      <div v-else>
        <div v-if="alreadyReviewed">
          <h3>You already have a review</h3>
        </div>
        <div v-else>
          <div>
            <div class="form-group">
              <label class="text-muted"
                >Select the star rating (1 is worst - 5 is best)</label
              >
              <star-rating v-model="review.rating" class="fa-3x"></star-rating>
            </div>
            <div class="form-group">
              <label for="content" class="text-muted"
                >Describe your experience with</label
              >
              <textarea
                v-model="review.content"
                name="content"
                id="content"
                cols="30"
                rows="10"
                class="form-control"
                :class="{ 'is-invalid': hasValidationError }"
              ></textarea>
              <validation-errors
                :errors="errorFor('content')"
              ></validation-errors>
            </div>
            <button
              @click="submit"
              class="btn btn-lg btn-primary btn-block"
              :disabled="loading"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationErrors from "../shared/components/ValidationErrors.vue";
import errorsValidation from "../shared/mixins/errorsValidation";
import { is404, is422 } from "../shared/utils/response";

export default {
  mixins: [errorsValidation],
  components: { ValidationErrors },
  name: "Review",
  data() {
    return {
      review: {
        id: null,
        rating: 5,
        content: null,
      },
      existingReview: null,
      loading: false,
      booking: null,
      error: false,
      sending: false,
      success: false,
    };
  },
  computed: {
    alreadyReviewed() {
      return this.hasReview || !this.hasBooking;
    },
    hasReview() {
      return this.existingReview !== null;
    },
    hasBooking() {
      return this.booking !== null;
    },
    oneColumn() {
      return !this.loading && this.alreadyReviewed;
    },
    twoColumns() {
      return this.loading || !this.alreadyReviewed;
    },
    hasValidationError() {
      return this.errors && this.errors.content && this.errors.content.length;
    },
  },
  methods: {
    submit() {
      this.success = false;
      this.sending = true;
      axios
        .post(`/api/reviews`, this.review)
        .then((response) => {
          console.log(response.data);
          if (response.status === 201) {
            this.success = true;
          }
        })
        .catch((err) => {
          if (is422(err)) {
            const errors = err.response.data.errors;
            if (
              Boolean(errors["content"]) &&
              Boolean(_.size(errors["content"]) === 1)
            ) {
              this.errors = errors;
              return;
            }
          }
          this.error = true;
        })
        .finally(() => {
          this.sending = false;
        });
    },
  },
  async created() {
    this.review.id = this.$route.params.id;
    this.loading = true;

    try {
      this.existingReview = (
        await axios.get(`/api/reviews/${this.$route.params.id}`)
      ).data.data;
    } catch (err) {
      if (is404(err)) {
        try {
          this.booking = (
            await axios.get(`/api/booking-by-review/${this.$route.params.id}`)
          ).data.data;
        } catch (err) {
          if (!is404(err)) this.error = true;
        }
      } else {
        this.error = true;
      }
    }

    this.loading = false;
  },
};
</script>
