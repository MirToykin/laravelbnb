<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">Check Availability</h6>
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
                >
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
                >
            </div>
            <button @click="check" class="btn btn-secondary btn-block">Check</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Availability",
        data() {
            return {
                from: null,
                to: null
            }
        },
        methods: {
            check() {
                alert('Checking')
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
</style>
