<template>
    <div>
        <breadcrumb :name_r="Cname"/>
        <div>
            <h3 class="title text-center">{{courseName}}</h3>
        </div>
        <v-tabs v-model="tab">
            <v-tab tab='resources'>
                Resources
            </v-tab>
            <v-tab tab='Tasks'>
                Tasks
            </v-tab>
            <v-tab tab='labs' v-if="course.data.lab == '1'">
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
            <v-tab-item tab='resources' max-width="600">
                <div>
                    <div v-for="(type, index) in resources.types" :key="index">
                        <h3 v-if="type=='slides'"  class="title text-center">Slides / Notes</h3>
                        <h3 v-else-if="type=='projects'"  class="title text-center">Projects</h3>
                        <h3 v-else class="title text-center">Books</h3>
                        <div style="" v-if="resources.data.length">
                            <div v-for="resource in resources.data" :key="resource.id">
                                <v-card class="mx-auto" style="margin: 6px;" max-width="1000" v-if="type == resource.type">
                                    <div>
                                        <v-container class="">
                                            <v-row no-gutters class="padding: 25px">
                                                <v-col key="1" sm="10" xs="10" md="10" xl="10" lg="10">
                                                    <div class="resource">
                                                        <p class="left">
                                                            <img :src="`/img/files/${icons[resource.icon] || 'file'}.svg`" class="mr-4 w-8" >
                                                        </p>
                                                        <div class="center">
                                                            <p class="name text-wrap">{{resource.name}}</p>
                                                            <p class="cr">Uploaded <strong>{{timeSince(resource.created.seconds) }}  </strong> by
                                                            <strong> {{resource.userName}} </strong></p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                                <v-col key="2" sm="2" xs="2" md="2" lg="2" xl="2">
                                                    <p class="res_right">
                                                        <a :href="resource.downloadUrl" target="_blank" ><v-icon>mdi-link-variant</v-icon></a>
                                                        <a :href="resource.downloadUrl" target="_blank" ><v-icon>mdi-file-download</v-icon></a>
                                                    </p>
                                                </v-col>
                                                <v-responsive  width="100%" ></v-responsive>
                                            </v-row>
                                        </v-container>
                                    </div>
                                </v-card >
                            </div>
                        </div>
                    </div>
                </div>
            </v-tab-item>
            <v-tab-item tab='labs' max-width="600" v-if="course.data.lab == '1'">
                <v-card class="mx-auto" max-width="600">
                    <v-card-text>
                        Coming Soon
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item tab='tasks' max-width="600">
                <v-card class="mx-auto" max-width="600">
                    <v-card-text>
                        Coming Soon
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item tab='quizes' max-width="600">
                <v-card class="mx-auto" max-width="600">
                    <v-card-text>
                        Coming Soon
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item tab='assignments' max-width="600">
                <v-card class="mx-auto" max-width="600">
                    <v-card-text>
                        Coming Soon
                    </v-card-text>
                </v-card>
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
</template>

<script>
import breadcrumb from "../components/breadcrumb"

export default {
    name: 'resource',
    components: {
        breadcrumb
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
        timeSince(timeStamp) {
            let now = new Date()
            let secondsPast = (now.getTime() - timeStamp) / 1000;
            if (secondsPast < 60) {
                return parseInt(secondsPast) + 's';
            }
            if (secondsPast < 3600) {
                return parseInt(secondsPast / 60) + 'm';
            }
            if (secondsPast <= 86400) {
                return parseInt(secondsPast / 3600) + 'h';
            }
            if (secondsPast > 86400) {
                let timeStampObj = new Date(timeStamp * 1000); 
                let day = timeStampObj.getDate();
                let month = timeStampObj.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
                let year = timeStampObj.getFullYear() == now.getFullYear() ? "" : " " + timeStampObj.getFullYear();
                return day + " " + month + year;
            }
        }
    },
    mounted() {
        this.$store.dispatch("getCourseById", this.cId)
        this.$store.dispatch("getResourcesByCourse", this.cId)
    },
    computed: {
        course() {
            return this.$store.getters.courses
        },
        resources() {
            return this.$store.getters.resources
        },
    }
}
</script>
