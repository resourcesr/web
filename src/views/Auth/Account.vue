<template>
    <div>
    <breadcrumb name_r=""/>
    <br />
    <dHeader /> 
        <div :class="userProfile.name ? 'page': ''">
            <v-card class="mx-auto" max-width="600" v-if="showLoginForm" tile>
                <v-card-text>
                    <div>
                        <h3 class="title text--primary text-center">Get Started</h3>
                        <p class="text-center">Please enter the following detail to get started</p>
                        <v-divider />
                    </div>
                    <div class="text--primary">
                        <v-form ref="form"  v-model="valid" lazy-validation>
                            <v-text-field
                                :disabled="submit"
                                v-model="forms.login.email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>
                            <v-text-field
                                :disabled="submit"
                                v-model="forms.login.password"
                                :rules="passRules"
                                label="Password"
                                required
                                type="password"
                            ></v-text-field>
                            <v-card-actions style="display: block" class="pt-2">
                                <div class="">
                                    <a href="#!" @click="toggleForm" style="float:left">Don't have account?</a>
                                    <a href="#!" style="float:right"><router-link :to="{ name: 'reset' }">Forget Password?</router-link></a>
                                </div>
                                <div class="pt-10">
                                    <v-btn
                                        :disabled="!valid || submit"
                                        color="success"
                                        class=""
                                        @click="doLogin"
                                        style="width:100%"

                                        >
                                        Login
                                    </v-btn>
                                </div>
                                <div class="pt-2">
                                    <p class="text-center">OR</p>
                                </div>
                                <div>
                                    <v-btn
                                        :disabled="submit"
                                        color="success"
                                        class=""
                                        @click="loginWithGoogle"
                                        style="width:100%"

                                        ><v-icon>mdi-google</v-icon> 
                                        Login With Google
                                    </v-btn>
                                </div>
                            </v-card-actions>
                        </v-form>
                    </div>
                </v-card-text>

            </v-card>
            <v-card class="mx-auto" max-width="600" v-if="!showLoginForm">
                <v-card-text>
                    <div>
                        <h3 class="title text--primary text-center">Get Started</h3>
                        <p class="text-center">Please enter the following detail to get started</p>
                        <v-divider />
                    </div>
                    <div class="text--primary">
                        <v-form ref="form"  v-model="valid" lazy-validation>
                            <v-text-field
                                :disabled="submit"
                                v-model="forms.signup.name"
                                :counter="100"
                                :rules="nameRules"
                                label="Name"
                                required
                            ></v-text-field>
                            <v-text-field
                                :disabled="submit"
                                v-model="forms.signup.email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>
                            <v-text-field
                                :disabled="submit"
                                v-model="forms.signup.sap"
                                :counter="6"
                                :rules="sapRules"
                                label="SAP"
                                required
                            ></v-text-field>
                            <v-text-field
                                :disabled="submit"
                                v-model="forms.signup.password"
                                :rules="passRules"
                                label="Password"
                                required
                                type="password"
                            ></v-text-field>
                            <v-card-actions style="display: block" class="pt-2">
                                <div class="">
                                    <a href="#!" @click="toggleForm" style="float:left">Back to login?</a>
                                </div>
                                <div class="pt-10">
                                    <v-btn
                                        :disabled="!valid || submit"
                                        color="success"
                                        class=""
                                        @click="doSignup"
                                        style="width:100%"

                                        >
                                        Signup
                                    </v-btn>
                                </div>
                                <div class="pt-2">
                                    <p class="text-center">OR</p>
                                </div>
                                <div>
                                    <v-btn
                                        :disabled="submit"
                                        color="success"
                                        class=""
                                        @click="loginWithGoogle"
                                        style="width:100%"

                                        ><v-icon>mdi-google</v-icon> 
                                        Join With Google
                                    </v-btn>
                                </div>
                            </v-card-actions>
                        </v-form>
                    </div>
                </v-card-text>
            </v-card>
        </div>
        <v-snackbar v-model="isMsg">{{ msg }} </v-snackbar>

    </div>

</template>

<script>
import * as firebase from 'firebase/app'
import router from '../../router/index'
import breadcrumb from "../../components/breadcrumb"
import dHeader from "../../components/dHeader"
import { mapState } from 'vuex'

export default {
    components: {
        breadcrumb,
        dHeader
    },
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
        async loginWithGoogle() {
            this.submit = true
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider).then(resp => {
                this.$store.dispatch("fetchUserProfile", firebase.auth().currentUser)
                this.$router.push({name: "fill"})
            }).catch(err => {
                this.isMsg = true
                this.msg = err.message
                this.submit = false
            }).finally(status => {
                this.isMsg = true
                this.msg = status.message
                this.submit = false
            })
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
                        router.push("/")
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
    },
    computed: {
        ...mapState(['userProfile'])
    }
}
</script>