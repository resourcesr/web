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
                                <th class="text-left">Add Event</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="course in _courses" :key="course.id">
                                <td>{{course.title}}</td>
                                <td>{{course.code}}</td>
                                <td>{{course.semstor}}</td>
                                <td>{{course.teacher}}</td>
                                <td><a @click="addEvent(course.id, course.title)">Add</a></td>
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

        <div class="text-center">
            <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            >
            <v-toolbar color="primary">
            <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
                <v-toolbar-title>Event</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                    dark
                    text
                    @click="addEventDispatch()"
                    >
                    Save
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card>
                <v-simple-table style="height: 200px; overflow: auto">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Title</th>
                                <th class="text-left">Day</th>
                                <th class="text-left">Start</th>
                                <th class="text-left">End</th>
                                <th class="text-left">Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="event in events" :key="event.id">
                                <td>{{event.course_title}}</td>
                                <td>{{event.day}}</td>
                                <td>{{event.start}}</td>
                                <td>{{event.end}}</td>
                                <td>{{event.room}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-card-title class="headline grey lighten-2">
                Add event {{title}}
                </v-card-title>

                <v-card-text>
                    <v-select
                    :items="days"
                    label="Select day"
                    ></v-select>
                    <v-row
                    justify="space-around"
                    align="center"
                    >
                    <v-col style="width: 350px; flex: 0 1 auto;">
                        <h2>Start:</h2>
                        <v-time-picker
                        v-model="event.forms.start"
                        ></v-time-picker>
                    </v-col>
                    <v-col style="width: 350px; flex: 0 1 auto;">
                        <h2>End:</h2>
                        <v-time-picker
                        v-model="event.forms.end"
                        ></v-time-picker>
                    </v-col>
                    </v-row>
                    <v-text-field
                        v-model="event.forms.room"
                        :rules="nameRules"
                        label="Room"
                        required
                    >
                    </v-text-field>
                </v-card-text>

            </v-card>
            </v-dialog>
        </div>

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
        course_id: "",
        title: "",
        dialog: false,
        days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Friday',
            'Saturday',
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 1000) || 'Name must be less than 100 characters',
        ],
        semstors: [
            1, 2, 3, 4, 5, 6, 7, 8
        ],
        event: {
            forms: {
                day: null,
                start: null,
                end: null,
                room: null,
            }
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
      }
    },
    methods: {
        addEvent(id, title) {
            this.title = title
            this.course_id = id
            this.dialog = true
            this.$store.dispatch("event/getEventByCourse", id)
        },
        eventDataPrepare() {
            return {
                course_id: this.course_id,
                course_title: this.title,
                day: this.event.forms.day,
                start: this.event.forms.start,
                end: this.event.forms.end,
                room: this.event.forms.room,
            }
        },
        addEventDispatch() {
            this.submit = true
            if (this.valid) {
                this.$store.dispatch("event/addEvents", this.eventDataPrepare())
            }
            this.isMsg = true
            this.msg = "Added successfully"
            this.submit = false
            this.$refs.form.reset()
        },
        addCourse() {
            this.submit = true
            if (this.valid) {
                this.$store.dispatch("courses/addCourses", this.courses.forms)
            }
            this.isMsg = true
            this.msg = "Added successfully"
            this.submit = false
            this.$refs.form.reset()
        }
    },
    mounted() {
        this.$store.dispatch("classes/getClasses")
        this.$store.dispatch("courses/getAllCourses")
    },
    computed: {
        pClasses() {
            return this.$store.getters['classes/pClasses']
        },
        _courses() {
            return this.$store.getters['courses/courses']
        },
        events() {
            return this.$store.getters['event/events']
        }
    }
}
</script>
