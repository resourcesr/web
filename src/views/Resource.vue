<template>
    <div>
        <breadcrumb :name_r="Cname"/>
        <dHeader /> 
        <div :class="userProfile.name ? 'page': ''">
            <spinner v-if="loading == true" />
            <div>
                <h3 class="title text-center">{{courseName}}</h3>
            </div>
            <v-tabs v-model="tab">
                <v-tab tab='resources'>
                    Resources
                </v-tab>
                <v-tab tab='labs' v-if="course.data.lab && course.data.lab == '1'">
                    Labs
                </v-tab>
                <v-tab tab='assignments'>
                    Assignments
                </v-tab>
                <v-tab tab='quizes'>
                    Quizes
                </v-tab>
                <v-tab tab='about' >
                    About
                </v-tab>
            </v-tabs>
            <v-divider />
            <br /><br />
            <v-tabs-items v-model="tab">
                <v-tab-item tab='resources'>
                    <resources :resources="resources" :icons="icons" content="resource" />
                </v-tab-item>
                <v-tab-item tab='labs' max-width="600" v-if="course.data.lab && course.data.lab == '1'">
                    <resources :resources="resources" :icons="icons" content="lab" />
                </v-tab-item>
                <v-tab-item tab='assignments' max-width="600">
                    <resources :resources="resources" :icons="icons" content="assignment" />
                </v-tab-item>
                <v-tab-item tab='quizes' max-width="600">
                    <resources :resources="resources" :icons="icons" content="quiz" />
                </v-tab-item>
                <v-tab-item tab='about' max-width="1000">
                    <v-card class="mx-auto" max-width="1000">
                        <v-card-text>
                        <v-container>
                            <v-row no-gutters class="padding: 25px">
                                <v-col key="1">
                                    <div class="pa-3">
                                        <h3>Course Title:</h3>
                                        {{course.data.title}}
                                    </div>
                                </v-col>
                                <v-col key="2" >
                                    <div class="pa-3">
                                        <h3>Teacher:</h3>
                                        {{course.data.teacher}}
                                    </div>
                                </v-col>
                                <v-responsive  width="100%" ></v-responsive>
                                <v-col key="3">
                                    <div class="pa-3">
                                        <h3>Credit Code: </h3>
                                        {{course.data.code}} 
                                    </div>
                                </v-col>
                                <v-col key="4">
                                    <div class="pa-3">
                                        <h3>Credit Hrs: </h3>
                                        {{course.data.credit}} 
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </div>  
    </div>
</template>

<script>
import breadcrumb from "../components/breadcrumb"
import dHeader from "../components/dHeader"
import resources from "../components/resources"
import spinner from "../components/spinner"
import { mapState } from 'vuex'

export default {
    name: 'resource',
    components: {
        breadcrumb,
        dHeader,
        resources,
        spinner
    },
    data() {
        const {name: Cname, sub: cId, subName: courseName} = this.$route.params;
        return {
            Cname,
            cId,
            courseName,
            tab: null,
            icons: {
                word: "word",
                powerpoint: "powerpoint",
                zip: "zip",
                pdf: "pdf",
                file: "file",
            }
        }
    },
    methods: {
        scrollTop() {
            window.scrollTo(0, 0);
        },
    },
    mounted() {
        // we need to scroll top because, if not? the page loads where we click to subject
        this.scrollTop()
        this.$store.dispatch("courses/getCourseById", this.cId)
        this.$store.dispatch("resources/getResourcesByCourse", this.cId)
    },
    computed: {
        ...mapState('user', ['userProfile']),
        ...mapState('resources', ['loading', 'resources']),
        course() {
            return this.$store.getters['courses/courses']
        }       
    }
}
</script>
<style scoped>
    .page {
        margin-left: 290px;
    }
    @media only screen and (max-width: 1380px) {
        .page {
            margin-left: 0px;
        }
    }
</style>
