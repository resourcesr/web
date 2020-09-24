import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    userProfile: {},
    pClasses: {},
    courses: {},
    resources: {},
    announcements: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setClasses(state, val) {
      state.pClasses = val
    },
    setCourses(state, val) {
      state.courses = val
    },
    setResources(state, val) {
      state.resources = val
    },
    setAnnouncement(state, val) {
      state.announcements = val
    }
  },
  getters: {
    getCurrentUser : (state) => {
      return state.userProfile
    },
    pClasses: (state) =>  {
      return state.pClasses
    },
    courses(state) {
      return state.courses
    },
    resources(state) {
      return state.resources
    },
    user: (state) => {
      return state.userProfile
    },
    announcements: (state) => {
      return state.announcements
    }
  },
  actions: {
    async updateProfile({dispatch}, form) {
      // create user profile object in userCollections
      await fb.usersCollection.doc(fb.auth.currentUser.uid).update({
        name: form.name,
        sap: form.sap,
      });
        // fetch user profile and set in state
      dispatch('fetchUserProfile', fb.auth.currentUser.uid)
        
    },
    async completeProfile({dispatch}, data) {
      // create user profile object in userCollections
      await fb.usersCollection.doc(data.user.uid).set({
        name: data.form.name,
        sap: data.form.sap,
        role: "student",
        userId: data.user.uid,
      });
        // fetch user profile and set in state
      dispatch('fetchUserProfile', data.user)
        
    },
    async fetchUserProfile({commit}, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      localStorage.setItem("auth", user.uid)
      commit('setUserProfile', userProfile.data())
    },
    async addClasses({commit}, form) {
      await fb.classesCollection.add({
        created: new Date(),
        userId: fb.auth.currentUser.uid,
        program: form.program,
        name: form.name,
        code: form.code,
        cr: form.cr,
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
    async getClassesByProgram({commit}, program) {
      const subjects = await fb.classesCollection.orderBy('created', 'desc').where("program", "==", program).onSnapshot(snapshot => {
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
        teacher: form.teacher,
        class_id: form.class_id,
        semstor: form.semstor,
        code: form.code,
        credit: form.credit,
        lab: form.lab,
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
  
        commit('setCourses', clsArray)
      })
    },
    async getCourseByProgram({commit}, cls) {
      const subjects = await fb.coursesCollection.orderBy('created', 'desc').where("class_id", "==", cls).onSnapshot(snapshot => {
        let clsArray = []
        let sems = []
        snapshot.forEach(doc => {
          let cls = doc.data()
          cls.id = doc.id
          let sem = cls.semstor

          clsArray.push(cls)
          sems.push(sem)
        })
        let _sems = [...new Set(sems)];
        commit('setCourses', {data: clsArray, sems:_sems})
      })
    },
    async getCourseById({commit}, id) {
      const subjects = await fb.db.collection(`subjects/classes/courses/`).orderBy('created', 'desc').onSnapshot(snapshot => {
        let cArray = []
        let sems = []
        snapshot.forEach(doc => {
          let c = doc.data()
          c.id = doc.id
          if (c.id == id) {
            let sem = c.semstor

            cArray.push(c)
            sems.push(sem)            
          }
        })
        let _sems = [...new Set(sems)];
        commit('setCourses', {data: cArray[0], sems:_sems})
      })
    },
    async addResources({commit}, form) {
      const userProfile = await fb.usersCollection.doc(fb.auth.currentUser.uid).get()
      await fb.resourcesCollection.add({
        created: new Date(),
        userId: fb.auth.currentUser.uid,
        userName: userProfile.data().name,
        course_id: form.course_id,
        name: form.name,
        icon: form.icon,
        openUrl: form.openUrl,
        downloadUrl: form.downloadUrl,
        type: form.type,
        content: form.content,
      })
    },
    async getResourcesByCourse({commit}, course) {
      const subjects = await fb.resourcesCollection.orderBy('created', 'desc').where("course_id", "==", course).onSnapshot(snapshot => {
        let resArray = []
        let types = []
        snapshot.forEach(doc => {
          let res = doc.data()
          res.id = doc.id
          let type = res.type

          resArray.push(res)
          types.push(type)
        })
        let _types = [...new Set(types)];
        commit('setResources', {data: resArray, types:_types})
      })
    },
    async addAnnouncement({dispatch}, form) {
      const userProfile = await fb.usersCollection.doc(fb.auth.currentUser.uid).get()
      await fb.database.ref('announcement').push(
        {
          created: Date.now(),
          userName: userProfile.data().name,
          title: form.title,
          msg: form.msg,
        }
      )
      dispatch('fetchAnnouncement')
    },
    async fetchAnnouncement({commit}) {
      let data = []
      await fb.database.ref("announcement").on('value', (snap) => {
        data.push(snap.val())
      })
      data.reverse()
      commit('setAnnouncement', data)
    },
    async logout({ commit }) {
      await fb.auth.signOut()
    
      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      localStorage.removeItem("auth")
      //window.location.href = "/"
      router.push({name: "account"})
    },
  },
  modules: {
  }
})
