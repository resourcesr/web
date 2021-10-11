import * as fb from '../../firebase'

export default {
    namespaced: true,
    state: {
        events: {},
        loading: true,
    },
    mutations: {
        setEvent(state, val) {
            state.events = val
        },
        setLoading(state, val) {
            state.loading = val
        }
    },
    getters: {
        events(state) {
          return state.events
        }
    },
    actions: {
        async addEvent({commit}, form) {
            console.log(form);
          await fb.eventCollection.add({
            created: new Date(),
            userId: fb.auth.currentUser.uid,
            course_title: form.course_title,
            course_id: form.course_id,
            day: form.day,
            start: form.start,
            end: form.end,
            room: form.room,
            klass_id: form.klass_id,
            type: "class",
            sem: form.sem,
          })
        },
        async getEventByCourse({commit}, course_id) {
          const courses = await fb.eventCollection.orderBy('created', 'desc').where("course_id", "==", course_id).onSnapshot(snapshot => {
            let eventArray = []
            snapshot.forEach(doc => {
              let event = doc.data()
              event.id = doc.id
              eventArray.push(event)
            })
      
            commit('setEvent', eventArray)
          })
        },
    },
}