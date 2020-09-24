<template>
    <v-app>
        <v-card color="grey lighten-4" flat tile>
            <v-toolbar dense>
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
                                <v-icon  class="mr-1">mdi-moon-waxing-crescent</v-icon>
                            </v-btn>
                        </template>
                        <span>On</span>
                    </v-tooltip>
                    <v-tooltip v-else bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" color="dark" small fab @click="darkMode">
                                <v-icon color="white">mdi-white-balance-sunny</v-icon>
                            </v-btn>
                        </template>
                        <span>Off</span>
                    </v-tooltip>
                </div>
                <span class="pt-5"></span>
                <div class="mobile-only pl-5">
                    <v-menu>
                        <template v-slot:activator="{ attrs, on }">
                            <v-avatar v-bind="attrs"  v-on="on" size="46">
                                <img  src="/img/icons/user.jpg"  alt="John"  > 
                            </v-avatar>
                            
                        </template>
                        <navbar />
                    </v-menu>
                </div>
            </v-toolbar>
        </v-card>
        <v-app>
            <v-main> 
                <router-view />
            </v-main>
        </v-app>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
import navbar from "./components/navbar"

export default {
    name: 'App',
    components: {
        navbar,
    },
    watch: {
        $route (to, from) {
            let title = "ResourceR"
            if (typeof to.meta.title == "string")
                title = `${to.meta.title} - ResourceR` 
            else if (typeof to.meta.title == "function")
                title = `${to.meta.title(to)} - ResourceR`
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
            this.$store.dispatch("logout")
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
