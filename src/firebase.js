import * as firebase from 'firebase/app'
import firebaseConfig from "./firebaseConfig"
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const classesCollection = db.collection('classes')
const semestorsCollection = db.collection('semestors')
const resourcesCollection = db.collection('resources')
const postsCollection = db.collection('posts')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  semestorsCollection,
  resourcesCollection,
  classesCollection
}