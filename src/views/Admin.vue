<template>
    <div>
        <div v-if="user.role == 'admin'">
            <v-card>
                <v-tabs v-model="tab">
                    <v-tab tab='subjects'>
                        Subjects
                    </v-tab>
                    <v-tab tab='classes'>
                        Classes
                    </v-tab>
                    <v-tab tab='courses'>
                        Courses
                    </v-tab>
                    <v-tab tab='resources'>
                        Resources
                    </v-tab>
                    <v-tab tab='tasks'>
                        Tasks
                    </v-tab>
                    <v-tab tab='labs'>
                        Labs
                    </v-tab>
                </v-tabs>
                <v-divider />

                <v-tabs-items v-model="tab">
                    <v-tab-item tab='subjects'>
                        <v-card flat>
                            <v-card-title>Subjects</v-card-title>
                            <v-card-subtitle>Lists</v-card-subtitle>
                            <v-card-text>
                                <v-list v-if="subject.length">
                                    <v-list-item v-for="sub in subject" :key="sub.id">
                                    {{sub.name}} - {{sub.code}}
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                            <v-card-subtitle>Add new</v-card-subtitle>
                            <v-card class="mx-auto" tile>
                                <v-card-text>
                                    <div class="text--primary">
                                        <v-form ref="form"  v-model="valid" lazy-validation>
                                            <v-text-field
                                                v-model="subjects.forms.name"
                                                :rules="nameRules"
                                                label="Name"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="subjects.forms.code"
                                                :rules="nameRules"
                                                label="Code"
                                                required
                                                type="Code"
                                            ></v-text-field>
                                            <v-card-actions>
                                                <v-btn
                                                    :disabled="!valid || submit"
                                                    color="success"
                                                    class="mr-4"
                                                    @click="addSubject"
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
                    </v-tab-item>
                    <v-tab-item tab='classes'>
                        <v-card flat>
                            <v-card-title>Classes</v-card-title>
                            <v-card-subtitle>Lists</v-card-subtitle>
                            <v-card-text>
                                <v-list>
                                    <v-list-item v-for="cls in pClasses" :key="cls.id">
                                    {{cls.name}} - {{cls.code}} -  {{cls.program}}
                                    </v-list-item>
                                </v-list>
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
                    </v-tab-item>
                    <v-tab-item tab='courses'>
                        <v-card flat>
                            <v-card-title>COurses</v-card-title>
                            <v-card-subtitle>Lists</v-card-subtitle>
                            <v-card-text>
                                <v-list>
                                   
                                </v-list>
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
                                            ></v-text-field>
                                            <label class="label-custom">Select Subject</label>
                                            <select class="v-select__selections" v-model="courses.forms.subject_id">
                                                <option v-for="item in subject" :key="item.id" :value="item.id">{{item.name}}</option>
                                            </select>
                                            <label class="label-custom">Select Course</label>
                                            <select class="v-select__selections" v-model="courses.forms.class_id">
                                                <option v-for="item in pClasses" :key="item.id" :value="item.id">{{item.name}}</option>
                                            </select>
                                            <label class="label-custom">Select semstor</label>
                                            <select class="v-select__selections" v-model="courses.forms.semstor">
                                                <option v-for="item in semstors" :key="item" :value="item">{{item}}</option>
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
                    </v-tab-item>
                    <v-tab-item tab='resources'>
                        <v-card flat>
                            <v-card-title>Resources</v-card-title>
                            <v-card-subtitle>Lists</v-card-subtitle>
                            <v-card-text>
                                <v-list>
                                   
                                </v-list>
                            </v-card-text>
                            <v-card-subtitle>Add new</v-card-subtitle>
                            <v-card class="mx-auto" tile>
                                <v-card-text>
                                    <div class="text--primary">
                                        <v-form ref="form"  v-model="valid" lazy-validation>
                                            <v-text-field
                                                v-model="resources.forms.name"
                                                :rules="nameRules"
                                                label="Name"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="resources.forms.icon"
                                                :rules="nameRules"
                                                label="Icon"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="resources.forms.openUrl"
                                                :rules="nameRules"
                                                label="Open URL"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="resources.forms.downloadUrl"
                                                :rules="nameRules"
                                                label="Download URL"
                                                required
                                            ></v-text-field>
                                            <label class="label-custom">Select Course</label>
                                            <select class="v-select__selections" v-model="courses.forms.subject_id">
                                                <option v-for="item in _courses" :key="item.id" :value="item.id">{{item.title}}</option>
                                            </select>
                                            <v-card-actions>
                                                <v-btn
                                                    :disabled="!valid || submit"
                                                    color="success"
                                                    class="mr-4"
                                                    @click="addResource"
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
                    </v-tab-item>
                </v-tabs-items>
            </v-card>

            <v-snackbar v-model="isMsg">{{ msg }} </v-snackbar>
        </div>
        <div v-else>
            Not a admin
        </div>
    </div>
</template>

<script>

export default {
    name: 'Admin',
    data () {
      return {
        tab: null,
        valid: false,
        submit: false,
        isMsg: false,
        msg: "",
        subs: [],
        semstors: [
            1, 2, 3, 4, 5, 6, 7, 8
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 100) || 'Name must be less than 100 characters',
        ],
        subjects: {
            forms: {
                name: "", // Programming fundenmntals
                code: "", // cs150
            },
        },
        classes: {
            forms: {
                program: "", // BSSE
                name: "", // Programming fundenmntals
                code: "", // cs150
            },
        },
        courses: {
            forms: {
                subject_id: "", // BSSE
                class_id: "", // Programming fundenmntals
                title: "", //title
                semstor: "",
            },
        },
        resources: {
            forms: {
                course_id: "", // class id
                name: "", // Programming fundenmntals
                icon: "",
                openUrl: "",
                downloadUrl: "",
            },
        },
        tasks: {
            forms: {
                course_id: "", // class id
                name: "", // Programming fundenmntals
                icon: "",
                link: "",
                download: "",
            },
        },
        labs: {
            forms: {
                course_id: "", // class id
                name: "", // Programming fundenmntals
                code: "", // cs150
                date: null, // date
                user_id: "", // Id
                icon: "",
                link: "",
                download: "",
            },
        },
      }
    },
    methods: {
        addSubject() {
            this.submit = true
            if (this.valid) {
                console.log(this.subjects.forms)
                this.$store.dispatch("addSubject", this.subjects.forms)
            }
            this.isMsg = true
            this.msg = "Added successfully"
            this.submit = false
        },
        addClasses() {
            this.submit = true
            if (this.valid) {
                this.$store.dispatch("addClasses", this.classes.forms)
            }
            this.isMsg = true
            this.msg = "Added successfully"
            this.submit = false
        },
        addCourse() {
            this.submit = true
            if (this.valid) {
                this.$store.dispatch("addCourses", this.courses.forms)
            }
            this.isMsg = true
            this.msg = "Added successfully"
            this.submit = false
        },
        addResource() {
            this.submit = true
            if (this.valid) {
                this.$store.dispatch("addResources", this.resources.forms)
            }
            this.isMsg = true
            this.msg = "Added successfully"
            this.submit = false
        },
    },
    mounted() {
        this.$store.dispatch("getSubjects")
        this.$store.dispatch("getClasses")
        this.$store.dispatch("getAllCourses")
    },
    computed: {
        user() {
            return this.$store.getters.getCurrentUser
        },
        subject() {
            return this.$store.getters.subjects
        },
        _class() {
            return this.$store.getters.pClasses
        },
        pClasses() {
            return this.$store.getters.pClasses
        },
        _courses() {
            return this.$store.getters._courses
        }
    }
}
</script>
