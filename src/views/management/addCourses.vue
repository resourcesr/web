<template>
    <div>
        <v-card flat>
            <v-card-title>Courses</v-card-title>
            <v-card-subtitle>Lists</v-card-subtitle>
            <v-card-text>
                <v-simple-table style="height: 200px; overflow: auto">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Name</th>
                                <th class="text-left">Code</th>
                                <th class="text-left">Sem</th>
                                <th class="text-left">Teacher</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="course in _courses" :key="course.id">
                                <td>{{course.title}}</td>
                                <td>{{course.code}}</td>
                                <td>{{course.semstor}}</td>
                                <td>{{course.teacher}}</td>
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
                                v-model="courses.forms.title"
                                :rules="nameRules"
                                label="title"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="courses.forms.teacher"
                                :rules="nameRules"
                                label="Teacher"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="courses.forms.code"
                                :rules="nameRules"
                                label="Code"
                                required
                            >
                            </v-text-field>
                    
                            <label class="label-custom">Select Class</label>
                            <select class="v-select__selections" v-model="courses.forms.class_id">
                                <option v-for="item in pClasses" :key="item.id" :value="item.id">{{item.name}}</option>
                            </select>
                            <label class="label-custom">Select semstor</label>
                            <select class="v-select__selections" v-model="courses.forms.semstor">
                                <option v-for="item in semstors" :key="item" :value="item">{{item}}</option>
                            </select>
                            <label class="label-custom">Select Credit Hrs</label>
                            <select class="v-select__selections" v-model="courses.forms.credit">
                                <option v-for="item in [1, 2, 3, 4, 5]" :key="item.id" :value="item">{{item}}</option>
                            </select>
                            <label class="label-custom">Has lab</label>
                            <select class="v-select__selections" v-model="courses.forms.lab">
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                            <v-card-actions>
                                <v-btn
                                    :disabled="!valid || submit"
                                    color="success"
                                    class="mr-4"
                                    @click="addCourse"
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
    name: 'addCourses',
    data () {
      return {
        tab: null,
        valid: false,
        submit: false,
        isMsg: false,
        msg: "",
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 1000) || 'Name must be less than 100 characters',
        ],
        courses: {
            forms: {
                class_id: "",
                title: "",
                semstor: "",
                teacher: "",
                code: "",
                credit: "",
                lab: "",
            },
        },
      }
    },
    methods: {
        addCourse() {
            this.submit = true
            if (this.valid) {
                this.$store.dispatch("addCourses", this.courses.forms)
            }
            this.isMsg = true
            this.msg = "Added successfully"
            this.submit = false
            this.$refs.form.reset()
        }
    },
    mounted() {
        this.$store.dispatch("getClasses")
        this.$store.dispatch("getAllCourses")
    },
    computed: {
        pClasses() {
            return this.$store.getters.pClasses
        },
        _courses() {
            return this.$store.getters.courses
        }
    }
}
</script>
