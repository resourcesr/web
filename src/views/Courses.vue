<template>
    <div>
        <breadcrumb :name_r="depName"/>
        <h3 class="title text-center">{{courseName}}</h3>
        <div v-if='courses.data.length'>
            <p class="text-center pt-5">Select your subject.</p>
            <div v-for="(sem, index) in courses.sems" :key="index">
                <h3 class="title text-center">Semester - 0{{sem}}</h3>
                <div style="" v-if="courses.data.length">
                    <div v-for="course in courses.data" :key="course.id">
                        <v-card class="mx-auto" style="margin: 6px;" max-width="1000" v-if="sem == course.semstor">
                            <router-link 
                            :to="{ path: `/res/${department}/${depName}/${CcourseID}/${courseName}/${course.id}/${course.title}`}" >
                                <div class='res'>
                                    <v-row no-gutters class="padding: 25px">
                                        <v-col key="1" sm="10" xs="10" md="10" xl="10" lg="10" stye='height: 100px'>
                                        <div class="resource">
                                            <p class="left">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24" :fill="colorFromStr(course.title)">
                                                <path d="M6,2C4.89,2 4,2.89 4,4V12C4,13.11 4.89,14 6,14H18C19.11,14 20,13.11 20,12V4C20,2.89 19.11,2 18,2H6M6,4H18V12H6V4M4,15C2.89,15 2,15.89 2,17V20C2,21.11 2.89,22 4,22H20C21.11,22 22,21.11 22,20V17C22,15.89 21.11,15 20,15H4M8,17H20V20H8V17M9,17.75V19.25H13V17.75H9M15,17.75V19.25H19V17.75H15Z" /></svg>
                                            </p>
                                            <div class="center">
                                                <p class="name">{{course.title}}</p>
                                                <p class="cr">{{course.code }} {{course.teacher}}</p>
                                            </div>
                                        </div>
                                        </v-col>
                                        <v-col key="3">
                                        <p class="res_right">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                            </svg>
                                        </p>
                                        </v-col>
                                        <v-responsive  width="100%" ></v-responsive>
                                    </v-row>
                                </div>
                            </router-link>
                        </v-card >
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-center pt-5">Sorry, no subjct found.</p>
        </div>
    </div>
</template>

<script>
import _colorFromStr from "../utils/"
import breadcrumb from "../components/breadcrumb"

export default {
    name: 'courses',
    components: {
        breadcrumb
    },
    data() {
        const {course: CcourseID, name: courseName, department: department, dname: depName} = this.$route.params;
        return {
            CcourseID,
            courseName,
            department,
            depName,
        }
    },
    methods: {
        colorFromStr(str) {
            return _colorFromStr(str)
        }
    },
    mounted() {
        this.$store.dispatch("getCourseById", this.CcourseID)
        this.$store.dispatch("getCourseByProgram", this.CcourseID)
    },
    computed: {
        courses() {
            return this.$store.getters.courses
        }
    }
}
</script>
