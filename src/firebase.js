import * as firebase from 'firebase/app'
import firebaseConfig from "./firebaseConfig"
import 'firebase/auth'
import 'firebase/firestore'
import "firebase/database"

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const database = firebase.database()

// collection references
const usersCollection = db.collection('users')
const subjectsCollection = db.collection('subjects')
const classesCollection = db.collection('subjects/classes/main')
const coursesCollection = db.collection('subjects/classes/courses')
const resourcesCollection = db.collection('subjects/courses/resources')
const tasksCollection = db.collection('subjects/classes/tasks')
const postsCollection = db.collection('posts')

// export utils/refs
export {
  db,
  database,
  auth,
  usersCollection,
  postsCollection,
  subjectsCollection,
  resourcesCollection,
  classesCollection,
  tasksCollection,
  coursesCollection
}