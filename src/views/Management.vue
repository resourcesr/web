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
                       <addAnnouncement />
                    </v-tab-item>
                    <v-tab-item tab='classes'>
                        <addClasses />
                    </v-tab-item>
                    <v-tab-item tab='courses'>
                        <addCourses />
                    </v-tab-item>
                    <v-tab-item tab='resources'>
                        <addResources />
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </div>
        <div v-else>
            Not a admin
        </div>
    </div>
</template>

<script>
import addAnnouncement from "./management/addAnnouncement"
import addClasses from "./management/addClasses"
import addCourses from "./management/addCourses"
import addResources from "./management/addResources"

export default {
    name: 'Admin',
    components: {
        addAnnouncement,
        addClasses,
        addResources,
        addCourses
    },
    data () {
      return {
        tab: null
      }
    },
    computed: {
        user() {
            return this.$store.getters['user/getCurrentUser']
        }
    }
}
</script>
