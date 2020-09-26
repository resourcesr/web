import * as fb from '../../firebase'


export default {
    namespaced: true,
    state: {
        announcements: {}
    },
    mutations: {
        setAnnouncement(state, val) {
            state.announcements = val
        }
    },
    getters: {
        announcements: (state) => {
            return state.announcements
        }
    },
    actions: {
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
        }
    }
}
