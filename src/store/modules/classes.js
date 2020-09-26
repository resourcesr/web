import * as fb from '../../firebase'

export default {
	namespaced: true,
	state: {
		pClasses: {},
		loading: true,
	},
	mutations: {
		setClasses(state, val) {
			state.pClasses = val
		},
		setLoading(state, val) {
			state.loading = val
		}
	},
	getters: {
		pClasses: (state) =>  {
			return state.pClasses
		}
	},
	actions: {
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
			commit('setLoading', true)
			const subjects = await fb.classesCollection.orderBy('created', 'desc').where("program", "==", program).onSnapshot(snapshot => {
				let clsArray = []
			
				snapshot.forEach(doc => {
				let cls = doc.data()
				cls.id = doc.id
			
				clsArray.push(cls)
				})
				commit('setClasses', clsArray)
				commit('setLoading', false)
			})
		}
	}
}
