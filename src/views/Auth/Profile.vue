<template>
    <div>
    <br>
    <dHeader /> 
        <div class="page">
            <div v-if="!userProfile.name">
                <v-card class="mx-auto" max-width="600">
                    <v-card-text>
                        <div>
                            <h3 class="title text--primary text-center">Complete your profile</h3>
                            <p class="text-center">Complete your profile to get started</p>
                            <v-divider />
                        </div>
                        <div class="text--primary">
                            <v-form ref="form"  v-model="valid" lazy-validation>
                                <v-text-field
                                    :disabled="submit"
                                    v-model="forms.name"
                                    :counter="100"
                                    :rules="nameRules"
                                    label="Name"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    :disabled="submit"
                                    v-model="forms.sap"
                                    :counter="6"
                                    :rules="sapRules"
                                    label="SAP"
                                    required
                                ></v-text-field>
                                <v-card-actions style="display: block" class="pt-2">
                                    <div class="pt-10">
                                        <v-btn
                                            :disabled="!valid || submit"
                                            color="success"
                                            class=""
                                            @click="doSignup"
                                            style="width:100%"

                                            >
                                            Submit
                                        </v-btn>
                                    </div>
                                </v-card-actions>
                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
            <div v-else>
                <v-card class="mx-auto" max-width="600">
                    <v-card-text>
                        <div>
                            <h3 class="title text--primary text-center">Update your profile</h3>
                            <p class="text-center">You can update your profile from here.</p>
                            <v-divider />
                        </div>
                        <div class="text--primary">
                            <v-form ref="form"  v-model="valid" lazy-validation>
                                <v-text-field
                                    :disabled="submit"
                                    v-model="forms.name"
                                    :counter="100"
                                    :rules="nameRules"
                                    label="Name"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    :disabled="submit"
                                    v-model="forms.sap"
                                    :counter="6"
                                    :rules="sapRules"
                                    label="SAP"
                                    required
                                ></v-text-field>
                                <v-card-actions style="display: block" class="pt-2">
                                    <div class="pt-10">
                                        <v-btn
                                            :disabled="!valid || submit"
                                            color="success"
                                            class=""
                                            @click="doUpdate"
                                            style="width:100%"

                                            >
                                            update
                                        </v-btn>
                                    </div>
                                </v-card-actions>
                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    <v-snackbar v-model="isMsg">{{ msg }} </v-snackbar>
    </div>

</template>

<script>
import * as firebase from 'firebase/app'
import { mapState } from 'vuex'
import router from '../../router/index'
import dHeader from "../../components/dHeader"

export default {
    components: {
        dHeader
    },
    data() {
        return {
            valid: true,
            submit: false,
            forms: {
                name: "",
                sap: "",
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
            isMsg: false,
            msg: ""
        }
    },
    methods: {
        validate () {
            this.$refs.form.validate()
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        doSignup() {
            this.validate();
            if (this.valid) {
                this.submit = true
                this.$store.dispatch("completeProfile", {user: firebase.auth().currentUser, form: this.forms})
                this.msg = "Account created successfully"
                router.push('/')
            }
        },
        doUpdate() {
            this.validate();
            if (this.valid) {
                this.submit = true
                this.$store.dispatch("updateProfile", this.forms)
                this.msg = "Account created successfully"
                router.push('/')
            }
        }
    },
    computed: {
        ...mapState(['userProfile'])
    }
}
</script>
