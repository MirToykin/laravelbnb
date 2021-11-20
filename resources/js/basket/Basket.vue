<template>
    <success-result v-if="success">Объект забронирован</success-result>
    <div v-else class="row">
        <div v-if="itemsInBasket" class="col-md-8">
            <div class="row">
                <div class="col-md-6 form-group">
                    <label for="first_name">First name</label>
                    <input type="text" class="form-control" placeholder="First name" name="first_name" id="first_name"
                           v-model="customer.first_name" :class="{ 'is-invalid': errorFor('customer.first_name') }"
                    />
                    <validation-errors :errors="errorFor('customer.first_name')"></validation-errors>
                </div>
                <div class="col-md-6 form-group">
                    <label for="last_name">Last name</label>
                    <input type="text" class="form-control" placeholder="Last name" name="last_name" id="last_name"
                           v-model="customer.last_name" :class="{ 'is-invalid': errorFor('customer.last_name') }"
                    />
                    <validation-errors :errors="errorFor('customer.last_name')"></validation-errors>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 form-group">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" placeholder="Email" name="email" id="email"
                           v-model="customer.email" :class="{ 'is-invalid': errorFor('customer.email') }"
                    />
                    <validation-errors :errors="errorFor('customer.email')"></validation-errors>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 form-group">
                    <label for="street">Street</label>
                    <input type="text" class="form-control" placeholder="Street" name="street" id="street"
                           v-model="customer.street" :class="{ 'is-invalid': errorFor('customer.street') }"
                    />
                    <validation-errors :errors="errorFor('customer.street')"></validation-errors>
                </div>
                <div class="col-md-6 form-group">
                    <label for="city">City</label>
                    <input type="text" class="form-control" placeholder="City" name="city" id="city"
                           v-model="customer.city" :class="{ 'is-invalid': errorFor('customer.city') }"
                    />
                    <validation-errors :errors="errorFor('customer.city')"></validation-errors>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 form-group">
                    <label for="country">Country</label>
                    <input type="text" class="form-control" placeholder="Country" name="country" id="country"
                           v-model="customer.country" :class="{ 'is-invalid': errorFor('customer.country') }"
                    />
                    <validation-errors :errors="errorFor('customer.country')"></validation-errors>
                </div>
                <div class="col-md-4 form-group">
                    <label for="state">State</label>
                    <input type="text" class="form-control" placeholder="State" name="state" id="state"
                           v-model="customer.state" :class="{ 'is-invalid': errorFor('customer.state') }"
                    />
                    <validation-errors :errors="errorFor('customer.state')"></validation-errors>
                </div>
                <div class="col-md-2 form-group">
                    <label for="zip">ZIP</label>
                    <input type="text" class="form-control" placeholder="ZIP" name="zip" id="zip"
                           v-model="customer.zip" :class="{ 'is-invalid': errorFor('customer.zip') }"
                    />
                    <validation-errors :errors="errorFor('customer.zip')"></validation-errors>
                </div>
            </div>
            <hr/>
            <div class="row">
                <div class="col-md-12 form-group">
                    <button type="submit" class="btn btn-lg btn-primary btn-block" @click.prevent="book"
                            :disabled="loading">Book now!
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="col-md-8">
            <div class="jumbotron jumbotron-fluid text-center">
                <h1>Empty</h1>
            </div>
        </div>
        <div class="col-md-4">
            <div class="d-flex justify-content-between">
                <h6 class="text-uppercase text-secondary font-weight-bolder">Your cart</h6>
                <h6 class="badge badge-secondary text-uppercase">
                    <span v-if="itemsInBasket">Items: {{ itemsInBasket }}</span>
                    <span v-else>Empty</span>
                </h6>
            </div>

            <transition-group name="fade">
                <div v-for="item in basket" :key="item.bookable.id">
                    <div class="pt-2 pb-2 border-top d-flex justify-content-between">
                    <span>
                        <router-link :to="{name: 'bookable', params: {id: item.bookable.id}}">
                            {{ item.bookable.title }}
                        </router-link>
                    </span>
                        <span class="font-weight-bold">${{ item.price.total }}</span>
                    </div>

                    <div class="pt-2 pb-2 d-flex justify-content-between">
                        <span>From {{ item.dates.from }}</span>
                        <span>To {{ item.dates.to }}</span>
                    </div>

                    <div class="pt-2 pb-2 text-right">
                        <button class="btn btn-sm btn-outline-secondary"
                                @click="$store.dispatch('removeFromBasket', item.bookable.id)">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapState} from "vuex";
import errorsValidation from "../shared/mixins/errorsValidation";

export default {
    name: 'Basket',
    mixins: [errorsValidation],
    data() {
        return {
            customer: {
                first_name: null,
                last_name: null,
                email: null,
                street: null,
                city: null,
                country: null,
                state: null,
                zip: null
            },
            loading: false,
            bookingAttempted: false
        }
    },
    methods: {
        async book() {
            this.bookingAttempted = false
            this.loading = true
            this.errors = null

            try {
                await axios.post('/api/checkout', {
                    bookings: this.basket.map(basketItem => ({
                        bookable_id: basketItem.bookable.id,
                        from: basketItem.dates.from,
                        to: basketItem.dates.to
                    })),
                    customer: this.customer
                })
                this.$store.dispatch('cleanBasket')
            } catch (error) {
                console.log('error', error.response)
                this.errors = error.response && error.response.data.errors
            }

            this.loading = false
            this.bookingAttempted = true

        }
    },
    computed: {
        ...mapGetters(['itemsInBasket']),
        ...mapState({
            basket: state => state.basket.items
        }),
        success() {
            return !this.loading && 0 === this.itemsInBasket && this.bookingAttempted
        }
    }
}
</script>
<style scoped>
h6.badge {
    font-size: 100%
}

a {
    color: #1b1e21;
}
</style>
