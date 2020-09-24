<template>
    <div>
    <br />
    <dHeader /> 
        <div class="page">
            <v-card class="mx-auto" max-width="600" tile>
                <v-card-text>
                    <div>
                        <h3 class="title text--primary text-center">Reset Password</h3>
                        <p class="text-center">Enter your email to reset your password.</p>
                        <v-divider />
                    </div>
                    <div class="text--primary">
                        <v-form ref="form">
                            <v-text-field
                                :disabled="submit"
                                v-model="forms.email"
                                label="E-mail"
                                required
                            ></v-text-field>
                            <v-card-actions style="display: block" class="pt-2">
                                <div>
                                    <v-btn
                                        :disabled="submit"
                                        color="success"
                                        class=""
                                        @click="doReset"
                                        style="width:100%"

                                        >
                                        Reset
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
import { auth } from '../../firebase';
import router from '../../router/index'
import dHeader from "../../components/dHeader"

export default {
    components: {
        dHeader
    },
    data() {
        return {
            submit: false,
            forms: {
                email: "",
            },
            isMsg: false,
            msg: ""
        }
    },
    methods: {
        doReset() {
            auth.sendPasswordResetEmail(this.forms.email).then(resp => {
                this.submit = false
            }).catch(err => {
                this.submit = false
            }).finally(status => {
                this.isMsg = true
                this.msg = "The password reset link has been sent to your email"
                this.submit = false
            })
            //TODO: handle error...
            this.forms.email = ""
        }       
    },
}
</script>