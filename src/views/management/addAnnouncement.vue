<template>
    <div>
        <v-card flat>
            <v-card-title>Announcements</v-card-title>
            <v-card-subtitle>Add new</v-card-subtitle>
            <v-card class="mx-auto" tile >
                <v-card-text>
                    <div class="text--primary">
                        <v-form ref="form"  v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="announcement.forms.title"
                                :rules="nameRules"
                                label="Title"
                                required
                            ></v-text-field>
                            <v-textarea
                                v-model="announcement.forms.msg"
                                :rules="nameRules"
                                filled
                                name="Message"
                                label="Message"
                            ></v-textarea>
                            <v-card-actions>
                                <v-btn
                                    :disabled="!valid || submit"
                                    color="success"
                                    class="mr-4"
                                    @click="addAnnouncement"
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
    name: 'addAnnouncement',
    data () {
      return {
        valid: false,
        submit: false,
        isMsg: false,
        msg: "",
        announcement: {
            forms: {
                title: "",
                msg: "",
            }
        }
      }
    },
    methods: {
        addAnnouncement() {
            this.submit = true
            if (this.valid) {
                this.$store.dispatch("addAnnouncement", this.announcement.forms)
            }
            this.submit = false
            this.$refs.form.reset()
        }
    },
    mounted() {
        this.$store.dispatch("fetchAnnouncement")
    },
    computed: {
        announcements() {
            return this.$store.getters.announcements
        }
    }
}
</script>
