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
            title = `${to.meta.title} - ClassR` 
        else if (typeof to.meta.title == "function")
            title = `${to.meta.title(to)} - ClassR`
        document.title = title        
      },
      
  },
  data() {
    return {
      drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],
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
