<template>
  <div>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar dense>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>ClassR</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          hide-details
          prepend-icon="search"
          placeholder="search..."
          single-line
        ></v-text-field>
      </v-toolbar>
    </v-card>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item v-if="loggedIn">
        <v-list-item-content>
          <v-list-item-title>{{userProfile.name}}</v-list-item-title>
          
        </v-list-item-content><v-btn
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-list-item v-else>
      <v-list-item-content>
          <v-list-item-title>Menu</v-list-item-title>
          </v-list-item-content><v-btn
            icon
            @click.stop="drawer = !drawer"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title><router-link :to="{ name: 'Home' }"><v-icon>home</v-icon> Home</router-link></v-list-item-title>
          </v-list-item-content>
          </v-list-item>
        <v-list-item link v-if="!loggedIn">
          <v-list-item-content>
            <v-list-item-title><router-link :to="{ name: 'account' }"><v-icon>home</v-icon> Account</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="loggedIn">
          <v-list-item-content>
            <v-list-item-title><router-link :to="{ name: 'forum' }"><v-icon>home</v-icon> Forum</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="loggedIn">
          <v-list-item-content>
            <v-list-item-title><router-link :to="{ name: 'forum' }"><v-icon>home</v-icon> Timetale</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="loggedIn">
          <v-list-item-content>
            <v-list-item-title @click="logout"><v-icon>home</v-icon> Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app>
        <v-main>
            <v-card tile>
                <v-card-text>
                    <ul class="breadcrumb">
                    <li
                        v-for="(breadcrumb, index) in breadcrumbList"
                        :key="index"
                        @click="routeTo(index)"
                        :class="{'linked': !!breadcrumb.route}">
                         {{name(breadcrumb.name)}}
                        <svg v-if="index != (breadcrumbList.length - 1)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                    </svg>
                    </li>
                </ul>
                </v-card-text>
            </v-card>
        <router-view/>
      </v-main>
    </v-app>
  </div>
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
            title = to.meta.title
        else if (typeof to.meta.title == "function")
            title = to.meta.title(to)
        else
            title = "Riphah Web Resouces"

        document.title = title
        this.title = title
        this.activeRoute = to
        
        this.updateList()
    },
    ...mapState(['userProfile']),
  },
  data() {
    return {
    drawer: null,
      breadcrumbList: [],
      activeRoute: { meta: {}, fullPath: '' },

        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],
    }
  },
  methods: {
    name(name) {
        if (typeof name == "string")
            return name;
        else if (typeof name == "function")
            return this.activeRoute.meta.title(this.activeRoute)
        
    },
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
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].route) {
        this.$router.push({name: this.breadcrumbList[pRouteTo].route, params: this.activeRoute.params})
      }
    },
    updateList () { 
      this.breadcrumbList = this.$route.meta.breadcrumb
      console.log(this.activeRoute.params)
      }

  },
  mounted() {
    this.userData(),
    this.updateList()
  },
  computed: {
    ...mapState(['userProfile']),
    loggedIn() {
      return localStorage.getItem("auth") != null || localStorage.getItem("auth") != undefined
    }
  }
}
</script>
