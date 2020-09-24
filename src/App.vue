<template>
    <v-app class="test">
        <v-card color="grey lighten-4" flat tile>
            <v-toolbar dense>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>
                    <router-link :to="{ name: 'Home' }">
                        ResourceR
                    </router-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <div>
                    <v-tooltip v-if="!$vuetify.theme.dark" bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" color="light" small fab @click="darkMode">
                                <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
                            </v-btn>
                        </template>
                        <span>On</span>
                    </v-tooltip>
                    <v-tooltip v-else bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" color="dark" small fab @click="darkMode">
                                <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
                            </v-btn>
                        </template>
                        <span>Off</span>
                    </v-tooltip>
                </div>
                <div v-if="userProfile.name">
                    <v-avatar size="36">
                        <img
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            alt="John"
                        >
                    </v-avatar>
                </div>
            </v-toolbar>
        </v-card>
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list-item v-if="userProfile.uid">
                <v-list-item-content>
                    <v-list-item-title v-if="userProfile.name">{{userProfile.name}}</v-list-item-title>
                    </v-list-item-content>
                    <v-btn  icon  @click.stop="drawer = !drawer" > <v-icon>mdi-chevron-left</v-icon>  </v-btn>
            </v-list-item>
            <v-list-item v-else>
                <v-list-item-content>
                    <v-list-item-title>Menu</v-list-item-title>
                </v-list-item-content>
                <v-btn icon  @click.stop="drawer = !drawer" > <v-icon>mdi-chevron-left</v-icon>  </v-btn>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense>
            <v-list-item link>
                <v-list-item-content>
                        <router-link :to="{ name: 'Home' }"><v-icon>home</v-icon> Home</router-link>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link v-if="userProfile.role && userProfile.role=='admin'">
                    <v-list-item-content>
                        <router-link :to="{ name: 'admin' }"><v-icon>home</v-icon> Admistrator</router-link>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link v-if="!userProfile.name">
                <v-list-item-content>
                    <router-link :to="{ name: 'account' }"><v-icon>home</v-icon> Account</router-link>
                </v-list-item-content>
                </v-list-item>
                <v-list-item link v-if="userProfile.name">
                <v-list-item-content>
                    <router-link :to="{ name: 'forum' }"><v-icon>home</v-icon> Timetale</router-link>
                </v-list-item-content>
                </v-list-item>
                <v-list-item link v-if="userProfile.name">
                <v-list-item-content>
                    <p @click="logout"><v-icon>home</v-icon> Logout</p>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app>
            <v-main> 
                <router-view />
            </v-main>
        </v-app>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'App',
    watch: {
        $route (to, from) {
            let title = "ClassR"
            if (typeof to.meta.title == "string")
                title = `${to.meta.title} - ClassR` 
            else if (typeof to.meta.title == "function")
                title = `${to.meta.title(to)} - ClassR`
            document.title = title        
        },
    },
    data() {
        return {
            drawer: null,
        }
    },
    methods: {
        userData() {
            if (localStorage.getItem("auth") != null || localStorage.getItem("auth") != undefined) {
                this.$store.dispatch("fetchUserProfile", {uid: localStorage.getItem("auth")})
            }
        },
        logout() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You are going to logot!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!'
            }).then((result) => {
                if (result.isConfirmed) {
                Swal.fire(
                    'Done!',
                    'You have been logged out.',
                    'success'
                )
                this.$store.dispatch("logout")
                }
            })
        },
        deleteCSS(css) {
            let elem = document.querySelector(".custom-css-appended")
            if (elem)
                elem.remove()
        },
        importCSS(css) {
            let element = document.createElement("link");
            element.setAttribute("rel", "stylesheet");
            element.setAttribute("type", "text/css");
            element.setAttribute("class", "custom-css-appended");
            element.setAttribute("href", `/css/${css}.css`);
            document.getElementsByTagName("head")[0].appendChild(element);
        },
        darkMode() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            if (this.$vuetify.theme.dark) {
                this.deleteCSS("light")
                this.importCSS("dark")
            } else {
                this.deleteCSS("dark")
                this.importCSS("light")
            }
        },
    },
    mounted() {
        this.userData()
  },
    computed: {
        ...mapState(['userProfile']),
        loggedIn() {
        return localStorage.getItem("auth") != null || localStorage.getItem("auth") != undefined
        },
    }
}
</script>
