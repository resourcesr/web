import * as fb from '../../firebase'

export default {
    namespaced: true,
    state: {
        courses: {},
        loading: true,
    },
    mutations: {
        setCourses(state, val) {
            state.courses = val
        },
        setLoading(state, val) {
            state.loading = val
        }
    },
    getters: {
        courses(state) {
          return state.courses
        }
    },
    actions: {
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
          commit('setLoading', true)
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
            commit('setLoading', false)
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
    },
}