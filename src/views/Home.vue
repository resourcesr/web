<template>
  <div>
        <breadcrumb name_r="Home"/>
        <dHeader /> 
        <div :class="userProfile.name ? 'page': ''">
            <p class="text-center pt-5">Select your department.</p>
            <v-divider class="pt-5"/>
            <v-card class="mx-auto custom-card" style="margin: 6px;" max-width="1000" v-for="(department, index) in departments" :key="index">
                <router-link  :to="{ name: 'classes:index', params: {department: department.key, dname:department.name }}">
                    <div class='res'>
                        <v-row no-gutters class="padding: 25px">
                            <v-col key="1" sm="10" xs="10" md="10" xl="10" lg="10" stye='height: 100px'>
                            <div class="resource">
                                <p class="left">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24" :fill="colorFromStr(department.name)">
                                    <path d="M6,2C4.89,2 4,2.89 4,4V12C4,13.11 4.89,14 6,14H18C19.11,14 20,13.11 20,12V4C20,2.89 19.11,2 18,2H6M6,4H18V12H6V4M4,15C2.89,15 2,15.89 2,17V20C2,21.11 2.89,22 4,22H20C21.11,22 22,21.11 22,20V17C22,15.89 21.11,15 20,15H4M8,17H20V20H8V17M9,17.75V19.25H13V17.75H9M15,17.75V19.25H19V17.75H15Z" /></svg>
                                </p>
                                <div class="center">
                                    <p class="name">{{department.name}}</p>
                                    <p class="cr">{{department.key}}</p>
                                </div>
                            </div>
                            </v-col>
                            <v-col key="3">
                            <p class="res_right">
                                <v-icon>
                                    mdi-arrow-right-thick
                                </v-icon>
                            </p>
                            </v-col>
                            <v-responsive  width="100%" ></v-responsive>
                        </v-row>
                    </div>            
                </router-link>
            </v-card>
        </div>
    </div>
</template>

<script>
import {_colorFromStr} from "../utils/"
import breadcrumb from "../components/breadcrumb"
import dHeader from "../components/dHeader"
import { mapState } from 'vuex'

export default {
    name: 'Home',
    components: {
        breadcrumb,
        dHeader
    },
    data() {
        return {
            departments: [
                {
                    key: "fc",
                    name: "Department Of Computing",
                }
            ]
        }
    },
    methods: {
        colorFromStr(str) {
            return _colorFromStr(str)
        }
    },
    computed: {
        ...mapState('user', ['userProfile'])
    }
}
</script>
