<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check Availability
            <span v-if="noAvailability" class="text-danger">(NOT AVAILABLE)</span>
            <span v-if="hasAvailability" class="text-success">(AVAILABLE)</span>
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
                    v-model="from"
                    @keyup.enter="check"
                    :class="{'is-invalid': errorFor('from')}"
                >
                <div
                    v-for="(error, i) in errorFor('from')" :key="`from_${i}`" class="invalid-feedback">{{error}}
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                    type="text"
                    name="to"
                    id="to"
                    class="form-control form-control-sm"
                    placeholder="End date"
                    v-model="to"
                    @keyup.enter="check"
                    :class="{'is-invalid': errorFor('to')}"
                >
                <div
                    v-for="(error, i) in errorFor('to')" :key="`to_${i}`" class="invalid-feedback">{{error}}
                </div>
            </div>
            <button @click="check" :disabled="loading" class="btn btn-secondary btn-block">Check</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Availability",
        props: {
            bookableId: String
        },
        data() {
            return {
                from: null,
                to: null,
                status: null,
                errors: null,
                loading: false
            }
        },
        methods: {
            check() {
                this.loading = true
                this.errors = null
                axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
                    .then((response) => {
                        this.status = response.status
                    })
                    .catch((error) => {
                        const response = error.response
                        if (response.status === 422) {
                            this.errors = response.data.errors
                        }
                        this.status = response.status
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },
            errorFor(field) {
                return this.hasErrors && this.errors[field] ? this.errors[field] : null
            }
        },
        computed: {
            hasErrors() {
                return this.status === 422 && this.errors !== null
            },
            hasAvailability() {
                return this.status === 200
            },
            noAvailability() {
                return this.status === 404
            }
        }
    }
</script>

<style scoped>
    label {
        font-weight: bolder;
        color: grey;
        text-transform: uppercase;
        font-size: 0.7rem;
    }
    .is-invalid {
        border-color: #b22222;
        background-image: none;
    }
    .invalid-feedback {
        color: #b22222;
    }
</style>
