<template>
    <div>
        <v-card flat>
            <v-card-title>Classes</v-card-title>
            <v-card-subtitle>Lists</v-card-subtitle>
            <v-card-text>                        
                <v-simple-table style="height: 200px; overflow: auto">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Name</th>
                                <th class="text-left">Code</th>
                                <th class="text-left">Program</th>
                                <th class="text-left">CR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cls in pClasses" :key="cls.id">
                                <td>{{cls.name}}</td>
                                <td>{{cls.code}}</td>
                                <td>{{cls.program}}</td>
                                <td>{{cls.cr}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
            <v-card-subtitle>Add new</v-card-subtitle>
            <v-card class="mx-auto" tile>
                <v-card-text>
                    <div class="text--primary">
                        <v-form ref="form"  v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="classes.forms.program"
                                :rules="nameRules"
                                label="Program"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="classes.forms.name"
                                :rules="nameRules"
                                label="Name"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="classes.forms.code"
                                :rules="nameRules"
                                label="Code"
                                required
                                type="Code"
                            ></v-text-field>
                            <v-text-field
                                v-model="classes.forms.cr"
                                :rules="nameRules"
                                label="CR"
                                required
                            ></v-text-field>
                            <v-card-actions>
                                <v-btn
                                    :disabled="!valid || submit"
                                    color="success"
                                    class="mr-4"
                                    @click="addClasses"
                                    style="float:right;"
                                    >
                                    Add
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </div>
                </v-card-text>
            </v-card>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'addClasses',
    data () {
      return {
        valid: false,
        submit: false,
        isMsg: false,
        msg: "",
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 1000) || 'Name must be less than 100 characters',
        ],
        classes: {
            forms: {
                program: "",
                name: "",
                code: "",
                cr: "",
            },
        },
      }
    },
    methods: {
        addClasses() {
            this.submit = true
            if (this.valid) {
                this.$store.dispatch("addClasses", this.classes.forms)
            }
            this.isMsg = true
            this.msg = "Added successfully"
            this.submit = false
            this.$refs.form.reset()
        },

    },
    mounted() {
        this.$store.dispatch("getClasses")
    },
    computed: {
        pClasses() {
            return this.$store.getters.pClasses
        },
    }
}
</script>
