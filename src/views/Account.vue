<template>
    <div>
        <v-card class="mx-auto" max-width="800" v-if="showLoginForm">
            <v-card-text>
                <p class="display-1 text--primary text-center">Login</p>
                <div class="text--primary">
                    <v-form ref="form"  v-model="valid" lazy-validation>
                         <v-text-field
                            v-model="forms.login.email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="forms.login.password"
                            :rules="passRules"
                            label="Password"
                            required
                            type="password"
                        ></v-text-field>
                        <v-card-actions>
                            <v-btn
                                color=""
                                class="mr-4"
                                @click="toggleForm"
                                style="float:left;"
                                >
                                Signup
                            </v-btn>
                            <v-btn
                                :disabled="!valid || submit"
                                color="success"
                                class="mr-4"
                                @click="doLogin"
                                style="float:right;"
                                >
                                Login
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </div>
            </v-card-text>

        </v-card>
        <v-card class="mx-auto" max-width="800" v-if="!showLoginForm">
            <v-card-text>
                <p class="display-1 text--primary text-center">Register</p>
                <div class="text--primary">
                    <v-form ref="form"  v-model="valid" lazy-validation>
                        <v-text-field
                            v-model="forms.signup.name"
                            :counter="100"
                            :rules="nameRules"
                            label="Name"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="forms.signup.email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="forms.signup.sap"
                            :counter="6"
                            :rules="sapRules"
                            label="SAP"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="forms.signup.password"
                            :rules="passRules"
                            label="Password"
                            required
                            type="password"
                        ></v-text-field>
                        <v-card-actions>
                            <v-btn
                                class="mr-4"
                                @click="toggleForm"
                                style="float:left;"
                                >
                                Back to login
                            </v-btn>
                            <v-btn
                                :disabled="!valid || submit"
                                color="success"
                                class="mr-4"
                                @click="doSignup"
                                style="float:right;"
                                >
                                Signup
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </div>
            </v-card-text>
        </v-card>

        <v-snackbar v-model="isMsg">{{ msg }} </v-snackbar>

    </div>

</template>

<script>
import * as firebase from 'firebase/app'
import router from '../router/index'

export default {
    data() {
        return {
            valid: true,
            submit: false,
            forms: {
                login: {
                    email: "",
                    password: "",
                },
                signup: {
                    name: "",
                    sap: "",
                    password: "",
                    email: '',
                }
            },
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 100 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            sapRules: [
                v => !!v || 'Sap num is required',
                v => /^[0-9]{4,6}$/.test(v) || 'SAP much be 4 to 6 digit long',
            ],
            passRules: [
                v => !!v || 'Sap num is required',
                v => /^[A-Za-z0-9]{6,}$/.test(v) || 'Password much be 6 digit or greater',
            ],
            showLoginForm: true,
            isMsg: false,
            msg: ""
        }
    },

    methods: {
        toggleForm() {
            this.showLoginForm = !this.showLoginForm
        },
        validate () {
            this.$refs.form.validate()
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        doLogin() {
            this.validate();
            this.isMsg = false
            this.msg = ""
            if (this.valid) {
                this.submit = true
                firebase.auth().signInWithEmailAndPassword(this.forms.login.email, this.forms.login.password).then(
                    (user) => {
                        localStorage.setItem('auth', firebase.auth().currentUser.uid)
                        this.isMsg = true
                        this.msg = "Logged in successfully"
                        this.$store.dispatch("fetchUserProfile", firebase.auth().currentUser)
                    },
                    (err) => {
                        this.isMsg = true
                        this.msg = err.message
                        this.submit = false
                    }
                );
            }
            this.resetValidation()
        },
        doSignup() {
            this.validate();
            if (this.valid) {
                this.submit = true
                firebase.auth().createUserWithEmailAndPassword(this.forms.signup.email, this.forms.signup.password).then(
                    (user) => {
                        this.isMsg = true
                        // create user profile object in userCollections
                        this.$store.dispatch("completeProfile", {user: firebase.auth().currentUser, form: this.forms.signup})
                        this.msg = "Account created successfully"
                        this.$store.dispatch("fetchUserProfile", firebase.auth().currentUser)
                    },
                    (err) => {
                        this.isMsg = true
                        this.msg = err.message
                        this.submit = false
                    }
                );
            }
        },
        isLogin() {
            if (localStorage.getItem("auth") != null || localStorage.getItem("auth") != undefined) {
                router.push('/')
            }
        }
    },
    mounted() {
        // Do not open the login page if user already logged in.
        this.isLogin();
    }
}
</script>