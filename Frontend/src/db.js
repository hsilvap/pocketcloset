// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '',
  authDomain: 'pocketcloset-345616.firebaseapp.com',
  databaseURL: 'https://pocketcloset-345616-default-rtdb.firebaseio.com',
  projectId: 'pocketcloset-345616',
  storageBucket: 'pocketcloset-345616.appspot.com',
  messagingSenderId: '35968910073',
  appId: '1:35968910073:web:aa06554b9f0e2a4a3e1828'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default app
export const auth = getAuth(app)
export const db = getFirestore(app)
export const getCurrentUser = () => auth.currentUser
