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
                            <a v-on="on"    @click="darkMode"><v-icon  class="mr-1">mdi-moon-waxing-crescent</v-icon></a>
                        </template>
                        <span>On</span>
                    </v-tooltip>
                    <v-tooltip v-else bottom>
                        <template v-slot:activator="{ on }">
                            <a v-on="on" @click="darkMode" color="white"><v-icon  class="mr-1">mdi-white-balance-sunny</v-icon></a>
                        </template>
                        <span>Off</span>
                    </v-tooltip>
                </div>
                <span class="pt-5"></span>
                <div>
                    <span class="pt-5"></span>
                    <div class="pl-5">
                        <router-link :to="{ name: 'accouncement' }">
                            <v-icon  class="mr-1">mdi-bell-ring</v-icon>
                        </router-link>
                    </div>
                </div>
                <span class="pt-5"></span>
                <div v-if="!userProfile.name">
                    <span style="border: 1px solid black; padding: 12px">
                        <router-link :to="{ name: 'account' }"><v-icon>mdi-account</v-icon> Account</router-link>
                    </span>
                </div>
                <div class="mobile-only pl-5" v-if="userProfile.name">
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

            <div>
            <span class="scroll" v-if="top" @click="scrollTop"><v-icon>keyboard_arrow_up</v-icon></span>
            </div>
            <div style="margin-top: 40px">
                <v-divider />
                <v-footer
                    absolute
                    class="font-weight-medium"
                    >
                    <v-col
                        class="text-center"
                        cols="12"
                    >
                        {{ new Date().getFullYear() }} - <strong>Made with <v-icon style='color: red'>mdi-heart</v-icon> By <a href="https://muhammadumerfarooq.me" target="_blank">Umer</a></strong>
                    </v-col>
                </v-footer>
            </div>
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
            top: false
        }
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        scrollTop() {
            window.scrollTo(0, 0);
        },
        handleScroll(event)
        {
            if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
                this.top = true
            } else {
                this.top = false
            }
        },
        userData() {
            if (localStorage.getItem("auth") != null || localStorage.getItem("auth") != undefined) {
                this.$store.dispatch("user/fetchUserProfile", {uid: localStorage.getItem("auth")})
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
        this.userData(),
        this.$store.dispatch("announcements/fetchAnnouncement")
    },
    computed: {
        ...mapState('user', ['userProfile']),
        loggedIn() {
            return localStorage.getItem("auth") != null || localStorage.getItem("auth") != undefined
        }
    }
}
</script>
