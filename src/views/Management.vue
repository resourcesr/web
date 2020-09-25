<template>
    <div>
    <br />
        <div v-if="user.role == 'admin'">
            <v-card>
                <v-tabs v-model="tab">
                     <v-tab tab='acconce'>
                        Announcements
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
                </v-tabs>
                <v-divider />
                <v-tabs-items v-model="tab">
                    <v-tab-item tab="acconce">
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
                    </v-tab-item>
                    <v-tab-item tab='classes'>
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
                    </v-tab-item>
                    <v-tab-item tab='courses'>
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
                    </v-tab-item>
                    <v-tab-item tab='resources'>
                        <v-card flat>
                            <v-card-title>Resources</v-card-title>
                            <v-card-subtitle>Lists</v-card-subtitle>
                            <v-card-text>
                                <v-simple-table style="height: 200px; overflow: auto">
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">Name</th>
                                                <th class="text-left">By</th>
                                                <th class="text-left">Type</th>
                                                <th class="text-left">Content Type</th>
                                                <th class="text-left">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="resource in _resources.data" :key="resource.id" >
                                                <td v-if="resource.delete != 'true' || resource.delete == undefined">{{ resource.name }}</td>
                                                <td v-if="resource.delete != 'true' || resource.delete == undefined">{{ resource.userName }}</td>
                                                <td v-if="resource.delete != 'true' || resource.delete == undefined">{{ resource.type }}</td>
                                                <td v-if="resource.delete != 'true' || resource.delete == undefined">{{ resource.content }}</td>
                                                <td v-if="resource.delete != 'true' || resource.delete == undefined"> <a @click="deleteResource(resource.id)">Delete</a></td>
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
                                                v-model="resources.forms.name"
                                                :rules="nameRules"
                                                label="Name"
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
                                            <select class="v-select__selections" v-model="resources.forms.course_id">
                                                <option v-for="item in _courses" :key="item.id" :value="item.id">{{item.title}}</option>
                                            </select>
                                            <label class="label-custom">Select Icon</label>
                                            <select class="v-select__selections" v-model="resources.forms.icon">
                                                <option v-for="(item, index) in icons" :key="index" :value="item">{{item}}</option>
                                            </select>
                                            <label class="label-custom">Select Type</label>
                                            <select class="v-select__selections" v-model="resources.forms.type">
                                                <option v-for="(item, index) in types" :key="index" :value="item">{{item}}</option>
                                            </select>
                                            <label class="label-custom">Select Content Type</label>
                                            <select class="v-select__selections" v-model="resources.forms.content">
                                                <option v-for="(item, index) in contents" :key="index" :value="item">{{item}}</option>
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
        icons: {
            word: "word",
            powerpoint: "powerpoint",
            zip: "zip",
            pdf: "pdf",
            file: "file",
        },
        types: [
            'slides', 'books', 'projects'
        ],
        contents: [
            'resource', 'assignment', 'quiz', 'lab',
        ],
        semstors: [
            1, 2, 3, 4, 5, 6, 7, 8
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 1000) || 'Name must be less than 100 characters',
        ],
        announcement: {
            forms: {
                title: "",
                msg: "",
            }
        },
        classes: {
            forms: {
                program: "",
                name: "",
                code: "",
                cr: "",
            },
        },
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
        resources: {
            forms: {
                course_id: "",
                name: "",
                icon: "",
                openUrl: "",
                downloadUrl: "",
                type: "",
                content: "",
            },
        },
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
        },
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
        addCourse() {
            this.submit = true
            if (this.valid) {
                this.$store.dispatch("addCourses", this.courses.forms)
            }
            this.isMsg = true
            this.msg = "Added successfully"
            this.submit = false
            this.$refs.form.reset()
        },
        addResource() {
            this.submit = true
            if (this.valid) {
                this.$store.dispatch("addResources", this.resources.forms)
            }
            this.isMsg = true
            this.msg = "Added successfully"
            this.submit = false
            this.$refs.form.reset()
        },
        deleteResource(ID) {
            this.$store.dispatch("deleteResource", ID),
            this.isMsg = true
            this.msg = "Deleted successfully"

        },
    },
    mounted() {
        this.$store.dispatch("fetchAnnouncement")
        this.$store.dispatch("getClasses")
        this.$store.dispatch("getAllCourses")
        this.$store.dispatch("getResources")
    },
    computed: {
        user() {
            return this.$store.getters.getCurrentUser
        },
        _class() {
            return this.$store.getters.pClasses
        },
        pClasses() {
            return this.$store.getters.pClasses
        },
        _courses() {
            return this.$store.getters.courses
        },
        announcements() {
            return this.$store.getters.announcements
        },
        _resources() {
            return this.$store.getters.resources
        }
    }
}
</script>
