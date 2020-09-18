import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    }
  },
  actions: {
    async completeProfile({dispatch}, data) {
      console.log(data)
      // create user profile object in userCollections
      await fb.usersCollection.doc(data.user.uid).set({
        name: data.form.name,
        sap: data.form.sap
      });
        // fetch user profile and set in state
      dispatch('fetchUserProfile', data.user)
        
    },
    async fetchUserProfile({commit}, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())
      
      // change route to dashboard
      router.push('/')
    },
    async logout({ commit }) {
      await fb.auth.signOut()
    
      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      router.push('/login')
    },
  },
  modules: {
  }
})
