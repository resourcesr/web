import * as fb from './firebase'
import router from "./router"

async function getUserData() {
    const id = localStorage.getItem("auth")
    if (id == null || id == undefined) {
        return false
    }
    const user = await fb.usersCollection.doc(id).get()
    return user.data()
}


export default getUserData

export const isRole = (role) => {
    getUserData().then(response => {
        if (response.role != role) {
            return false
        }
        return true
    }).catch(err => {
        return false
    })
}
