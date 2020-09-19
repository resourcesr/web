<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40" v-if="showNav"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
       <router-view/>
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld'
import { mapState } from 'vuex'

export default {
  name: 'App',
  watch: {
    $route (to, from) {
      if (typeof to.meta.title == "string")
        document.title = to.meta.title
      else if (typeof to.meta.title == "function")
        document.title = to.meta.title(to)
      else
        document.title = "Riphah Web Resouces"

    },
    ...mapState(['userProfile']),
  },
  data() {
    return {

    }
  },
  methods: {
    userData() {
      if (localStorage.getItem("auth") != null || localStorage.getItem("auth") != undefined) {
        this.$store.dispatch("fetchUserProfile", {uid: localStorage.getItem("auth")})
      }
    }
  },
  mounted() {
    this.userData()
  },
  computed: {
    ...mapState(['userProfile']),
    showNav() {
      return Object.keys(this.userProfile).length > 1
    }
  }
}
</script>
