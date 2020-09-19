import * as fb from './firebase'
import router from "./router"

async function getUserData() {
    const id = localStorage.getItem("auth")
    if (id == null || id == undefined) {
        router.push('/')
    }
    const user = await fb.usersCollection.doc(id).get()
    return user.data()
}


export default getUserData

export const isRole = (role) => {
    getUserData().then(response => {
        if (response.role != role) {
            router.push('/')
        }
    }).catch(err => {
        router.push('/')
    })
}