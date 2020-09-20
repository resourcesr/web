import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    userProfile: {},
    subjects: {},
    pClasses: {},
    _courses: {},
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setSubjects(state, val) {
      state.subjects = val
    },
    setClasses(state, val) {
      state.pClasses = val
    },
    setAllCourses(state, val) {
      state._courses = val
    },
  },
  getters: {
    getCurrentUser : (state) => {
      return state.userProfile
    },
    subjects: (state) => {
      return state.subjects
    },
    pClasses: (state) =>  {
      return state.pClasses
    },
    _courses(state) {
      return state._courses
    }
  },
  actions: {
    async completeProfile({dispatch}, data) {
      console.log(data)
      // create user profile object in userCollections
      await fb.usersCollection.doc(data.user.uid).set({
        name: data.form.name,
        sap: data.form.sap,
        role: "student"
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
      //router.push('/')
    },
    async addSubject({commit}, form) {
      await fb.subjectsCollection.add({
        created: new Date(),
        userId: fb.auth.currentUser.uid,
        name: form.name,
        code: form.code,
      })
    },
    async getSubjects({commit}) {
      const subjects = await fb.subjectsCollection.orderBy('created', 'desc').onSnapshot(snapshot => {
        let subArray = []
      
        snapshot.forEach(doc => {
          let sub = doc.data()
          sub.id = doc.id
      
          subArray.push(sub)
        })
      
        commit('setSubjects', subArray)
      })
    },
    async addClasses({commit}, form) {
      await fb.classesCollection.add({
        created: new Date(),
        userId: fb.auth.currentUser.uid,
        program: form.program,
        name: form.name,
        code: form.code,
      })
    },
    async getClasses({commit}) {
      const subjects = await fb.classesCollection.orderBy('created', 'desc').onSnapshot(snapshot => {
        let clsArray = []
      
        snapshot.forEach(doc => {
          let cls = doc.data()
          cls.id = doc.id
      
          clsArray.push(cls)
        })
        commit('setClasses', clsArray)
      })
    },

    async addCourses({commit}, form) {
      await fb.coursesCollection.add({
        created: new Date(),
        userId: fb.auth.currentUser.uid,
        title: form.title,
        subject_id: form.subject_id,
        class_id: form.class_id,
        semstor: form.semstor,
      })
    },
    async getAllCourses({commit}) {
      const courses = await fb.coursesCollection.orderBy('created', 'desc').onSnapshot(snapshot => {
        let clsArray = []
      
        snapshot.forEach(doc => {
          let cls = doc.data()
          cls.id = doc.id
      
          clsArray.push(cls)
        })
        commit('setAllCourses', clsArray)
      })
    },
    async addResources({commit}, form) {
      await fb.resourcesCollection.add({
        created: new Date(),
        userId: fb.auth.currentUser.uid,
        course_id: form.course_id,
        name: form.name,
        icon: form.icon,
        openUrl: form.openUrl,
        downloadUrl: form.downloadUrl,
      })
    },

    async logout({ commit }) {
      await fb.auth.signOut()
    
      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      localStorage.removeItem("auth")
      router.push('/account')
    },
  },
  modules: {
  }
})
