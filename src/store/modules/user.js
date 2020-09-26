import * as fb from '../../firebase'
import router from '../../router/index'


export default {
    namespaced: true,
    state: {
        userProfile: {}
    },
    mutations: {
        setUserProfile(state, val) {
        state.userProfile = val
        }
    },
    getters: {
        getCurrentUser : (state) => {
        return state.userProfile
        },
        user: (state) => {
        return state.userProfile
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
        async logout({ commit }) {
            await fb.auth.signOut()
            // clear userProfile and redirect to /login
            commit('setUserProfile', {})
            localStorage.removeItem("auth")
            //window.location.href = "/"
            router.push({name: "account"})
        }
    }
}
