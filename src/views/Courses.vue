<template>
    <div>
        <h3 class="title text-center">{{courseName}}</h3>
        <p class="text-center pt-5">Select your subject.</p>
        <div v-for="(sem, index) in courses.sems" :key="index">
            <h3 class="title text-center">Semester - 0{{sem}}</h3>
            <div style="" v-if="courses.data.length">
                <div v-for="course in courses.data" :key="course.id">
                    <v-card class="mx-auto" style="margin: 6px;" max-width="600" v-if="sem == course.semstor">
                        <router-link  :to="{ name: 'courses:resources', params: {course: course.id, name:course.title} }">
                            <div class="department-select">
                                <p class="left">
                                    <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"  class="icon_class"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                </p>
                                <div class="center">
                                    <p class="name">{{course.title}}</p>
                                    <p class="cr">{{course.code }} {{course.teacher}}</p>
                                </div>
                                <p class="right">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                                </p>
                            </div>
                        
                        </router-link>
                    </v-card >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        const {course: course, name: courseName} = this.$route.params;
        return {
        course,
        courseName,
        }
    },
    methods: {

    },
    mounted() {
        this.$store.dispatch("getCourseById", this.course)
        this.$store.dispatch("getCourseByProgram", this.course)
    },
    computed: {
        courses() {
            return this.$store.getters.courses
        },
    }
}
</script>