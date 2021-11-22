<template>
    <div class="w-50 m-auto">
        <div class="card card-body">
            <form action="">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text"
                           name="email"
                           id="email"
                           class="form-control"
                           placeholder="Enter your email"
                           v-model="email"
                           :class="{ 'is-invalid': errorFor('email') }"
                    />
                    <validation-errors :errors="errorFor('email')"></validation-errors>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password"
                           name="password"
                           id="password"
                           class="form-control"
                           placeholder="Enter your password"
                           v-model="password"
                           :class="{ 'is-invalid': errorFor('password') }"
                    />
                    <validation-errors :errors="errorFor('password')"></validation-errors>
                </div>
                <button type="submit" class="btn btn-primary btn-lg btn-block" @click.prevent="login">Log-in</button>
                <hr/>

                <div>
                    No account yet?
                    <router-link :to="{name: 'home'}" class="font-weight-bold">Register</router-link>
                </div>
                <div>
                    Forgotten password?
                    <router-link :to="{name: 'home'}" class="font-weight-bold">Reset password</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import errorsValidation from "./../shared/mixins/errorsValidation"
import {logIn} from "../shared/utils/auth"

export default {
    name: "Login",
    mixins: [errorsValidation],
    data() {
        return {
            email: null,
            password: null,
            loading: false,
        }
    },
    methods: {
        async login() {
            this.loading = true
            this.errors = null

            try {
                await axios.get('/sanctum/csrf-cookie')
                await axios.post('/login', {
                    email: this.email,
                    password: this.password
                })

                logIn()
                await this.$store.dispatch('loadUser')
                this.$router.push({name: 'home'})
            } catch (error) {
                this.errors = error.response && error.response.data.errors
            }
        }
    }
}
</script>

<style scoped>

</style>
