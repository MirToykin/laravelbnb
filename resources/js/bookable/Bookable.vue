<template>
    <div v-if="loading">Data is loading...</div>
    <div v-else class="row">
        <div class="col-md-8 pb-4">
            <div class="card">
                <div class="card-body">
                    <h2>{{ bookable.title }}</h2>
                    <hr/>
                    <article>{{ bookable.description }}</article>
                </div>
            </div>
            <review-list :bookable-id="$route.params.id"></review-list>
        </div>
        <div class="col-md-4 pb-4">
            <availability
                @availability="checkPrice"
                :bookable-id="$route.params.id"
                :price-fetching="priceFetching"
            ></availability>
            <transition>
                <price-breakdown
                    v-if="price"
                    :price="price"
                    class="mt-4"
                ></price-breakdown>
            </transition>
            <transition name="fade">
                <button :disabled="inBasketAlready" @click="addToBasket" v-if="price" class="btn btn-outline-secondary btn-block">
                    Book now
                </button>
            </transition>
            <button v-if="inBasketAlready" @click="removeFromBasket" class="btn btn-outline-secondary btn-block">
                Remove from basket
            </button>
            <div v-if="inBasketAlready" class="mt-4 text-muted warning">Bookable already in basket</div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import Availability from "./Availability";
import PriceBreakdown from "./PriceBreakdown.vue";
import ReviewList from "./ReviewList";

export default {
    name: "Bookable",
    data() {
        return {
            bookable: null,
            loading: false,
            price: null,
            priceFetching: false,
        };
    },
    components: {
        Availability,
        ReviewList,
        PriceBreakdown,
    },
    created() {
        this.loading = true;
        axios
            .get(`/api/bookables/${this.$route.params.id}`)
            .then((response) => (this.bookable = response.data.data))
            .catch((err) => console.log(err.message))
            .finally(() => (this.loading = false));
    },
    methods: {
        async checkPrice(availability) {
            if (!availability) {
                this.price = null;
                return;
            }
            // this.loading = true;
            try {
                this.price = (
                    await axios.get(
                        `/api/bookables/${this.$route.params.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`
                    )
                ).data.data;
                console.log(this.price);
            } catch (err) {
                console.log("error", err);
                this.price = null;
            }
            // this.loading = false;
        },
        addToBasket() {
            const payload = {
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch
            }

            this.$store.commit('addToBasket', payload)
        },
        removeFromBasket() {
            this.$store.commit('removeFromBasket', this.bookable.id)
        }
    },
    computed: {
        ...mapState({
            lastSearch: "lastSearch",
        }),
        inBasketAlready(state) {
            if (this.bookable === null) return null

            return this.$store.getters.inBasketAlready(this.bookable.id)
        }

    },
};
</script>

<style scoped>
.warning {
    font-size: 0.7rem;
}
</style>
