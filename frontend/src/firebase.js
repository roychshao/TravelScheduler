// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm-lVhcZHkJt_kvhn2jo5c2fq4jvQ9dYM",
  authDomain: "travelscheduler-385007.firebaseapp.com",
  projectId: "travelscheduler-385007",
  storageBucket: "travelscheduler-385007.appspot.com",
  messagingSenderId: "664222365368",
  appId: "1:664222365368:web:96dc9080bf32317623664d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provide = new GoogleAuthProvider();
