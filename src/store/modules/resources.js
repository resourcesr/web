import * as fb from '../../firebase'

export default {
    namespaced: true,
    state: {
        resources: {},
        loading: true,
    },
    mutations: {
        setResources(state, val) {
            state.resources = val
        },
        setLoading(state, val) {
            state.loading = val
        }
    },
    getters: {
        resources(state) {
            return state.resources
        }
    },
    actions: {
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
                size: form.size,
                mineType: form.mineType
            })
      },
      async deleteResource({dispatch}, id) {
            // create user profile object in userCollections
            await fb.resourcesCollection.doc(id).update({
                delete: "true"
            });
            dispatch('getResources')
      },
      async getResources({commit}) {
            const subjects = await fb.resourcesCollection.orderBy('created', 'desc').onSnapshot(snapshot => {
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
      async getResourcesByCourse({commit}, course) {
            commit('setLoading', true)
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
            commit('setLoading', false)
        })
      }
    }
}
