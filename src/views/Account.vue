<template>
    <div>
        <v-card class="mx-auto" max-width="800" v-if="showLoginForm">
            <v-card-text>
                <p class="display-1 text--primary text-center">Login</p>
                <div class="text--primary">
                    <v-form ref="form"  v-model="valid" lazy-validation>
                        <v-text-field
                            v-model="forms.login.sap"
                            :counter="6"
                            :rules="sapRules"
                            label="SAP"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="forms.login.password"
                            :rules="passRules"
                            label="Password"
                            required
                            type="password"
                        ></v-text-field>
                        <v-checkbox
                            v-model="checkbox"
                            :rules="[v => !!v || 'You must agree to continue!']"
                            label="Do you agree?"
                            required
                        ></v-checkbox>
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
                                :disabled="!valid"
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
                        <v-checkbox
                            v-model="checkbox"
                            :rules="[v => !!v || 'You must agree to continue!']"
                            label="Do you agree?"
                            required
                        ></v-checkbox>
                        <v-card-actions>
                            <v-btn
                                class="mr-4"
                                @click="toggleForm"
                                style="float:left;"
                                >
                                Back to login
                            </v-btn>
                            <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mr-4"
                                @click="validate"
                                style="float:right;"
                                >
                                Signup
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </div>
            </v-card-text>
        </v-card>
    </div>

</template>

<script>
  export default {
    data: () => ({
      valid: true,
      forms: {
        login: {
            sap: "",
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
      checkbox: false,
      showLoginForm: true,
    }),

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
            console.log(this.valid)
            if (this.valid) {
                
                // this.reset()
            }
            this.resetValidation()
        },
        doSignup() {
            this.validate();
            if (this.valid) {
                //code
            }
        },
    },
  }
</script>