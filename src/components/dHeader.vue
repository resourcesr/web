 <template>
    <div>
        <div class="desktop-header">
            <v-card height="350px" max-width="250">
                <v-navigation-drawer permanent left>
                    <template v-slot:prepend>
                        <v-list-item two-line v-if="userProfile.name">
                            <v-list-item-avatar>
                                <img src="/img/icons/user.jpg">
                            </v-list-item-avatar>

                            <v-list-item-content>
                                    <v-list-item-title>{{userProfile.name}}</v-list-item-title>
                                    <v-list-item-subtitle>{{userProfile.role}}</v-list-item-subtitle>
                                </v-list-item-content>
                        </v-list-item>
                    </template>
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
            </v-card>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: "dHeader",
    methods: {
        userData() {
            if (localStorage.getItem("auth") != null || localStorage.getItem("auth") != undefined) {
                this.$store.dispatch("fetchUserProfile", {uid: localStorage.getItem("auth")})
            }
        },
        logout() {
            this.$store.dispatch("logout")
        },
    },
    mounted() {
        this.userData()
    },
    computed: {
        ...mapState(['userProfile'])
    }
}
</script>
