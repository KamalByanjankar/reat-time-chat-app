import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "your API key",
  authDomain: "your Authentication Domain",
  projectId: "your Project Id",
  storageBucket: "your Storage Bucket",
  messagingSenderId: "your messaging sender Id",
  appId: "your app Id"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export { auth, provider }
  export default db