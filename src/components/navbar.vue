<template>
    <div>
        <v-list dense>
            <v-list-item two-line v-if="userProfile.name">
                <v-list-item-avatar>
                    <img src="/img/icons/user.jpg">
                </v-list-item-avatar>
                <v-list-item-content>
                        <v-list-item-title>{{userProfile.name}}</v-list-item-title>
                        <v-list-item-subtitle>{{userProfile.role}}</v-list-item-subtitle>
                    </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item link>
                <v-list-item-content>
                    <router-link :to="{ name: 'Home' }"><v-icon>home</v-icon> Home</router-link>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link v-if="userProfile.role && userProfile.role=='admin'">
                <v-list-item-content>
                    <router-link :to="{ name: 'admin' }"><v-icon>mdi-account-plus</v-icon> Admistrator</router-link>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link v-if="!userProfile.name">
                <v-list-item-content>
                    <router-link :to="{ name: 'account' }"><v-icon>mdi-account</v-icon> Account</router-link>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link v-if="userProfile.name">
                <v-list-item-content>
                    <router-link :to="{ name: 'profile' }"><v-icon>mdi-account</v-icon> Profile</router-link>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link v-if="userProfile.name">
                <v-list-item-content>
                    <router-link :to="{ name: 'timetable' }"><v-icon>mdi-timetable</v-icon> Timetable</router-link>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link v-if="userProfile.name">
                <v-list-item-content>
                    <p @click="logout"><v-icon>mdi-logout</v-icon> Logout</p>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: "navbar",
    methods: {
        logout() {
            this.$store.dispatch("user/logout")
        },
    },
    computed: {
        ...mapState('user', ['userProfile'])
    }
}
</script>
