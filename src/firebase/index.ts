import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDIQeQwre7E4cUBkb--1G_jdxf1XWIpKoU",
  authDomain: "shimehituzi-practice-d2c7c.firebaseapp.com",
  databaseURL: "https://shimehituzi-practice-d2c7c.firebaseio.com",
  projectId: "shimehituzi-practice-d2c7c",
  storageBucket: "shimehituzi-practice-d2c7c.appspot.com",
  messagingSenderId: "116370812428",
  appId: "1:116370812428:web:d582bf886b678ebafe8829"
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db
