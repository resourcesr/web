<template>
    <div>
        <breadcrumb :name_r="depName"/>
        <dHeader /> 
        <div :class="userProfile.name ? 'page': ''">
            <spinner v-if="loading == true" />
            <coursesView :courses="courses" :meta="meta"/>
        </div>
    </div>
</template>

<script>
import breadcrumb from "../components/breadcrumb"
import dHeader from "../components/dHeader"
import spinner from "../components/spinner"
import coursesView from "../components/coursesView"

import { mapState } from 'vuex'

export default {
    name: 'Courses',
    components: {
        breadcrumb,
        dHeader,
        spinner,
        coursesView
    },
    data() {
        const {course: CcourseID, name: courseName, department: department, dname: depName} = this.$route.params;
        return {
            CcourseID,
            courseName,
            department,
            depName,
            meta: {
                CcourseID: CcourseID,
                courseName: courseName,
                department: department,
                depName: depName,
            }
        }
    },

    mounted() {
        this.$store.dispatch("getCourseById", this.CcourseID)
        this.$store.dispatch("getCourseByProgram", this.CcourseID)
    },
    computed: {
        ...mapState(['userProfile', 'courses', 'loading'])
    }
}
</script>
