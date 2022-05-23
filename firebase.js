// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import authentication
import {getAuth} from "firebase/auth"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXiUF2ZsJjzIFPhFQvXZuc4_2ORFzvNso",
  authDomain: "topshots-cee2f.firebaseapp.com",
  projectId: "topshots-cee2f",
  storageBucket: "topshots-cee2f.appspot.com",
  messagingSenderId: "631687416436",
  appId: "1:631687416436:web:e7f71553caef2564411f21",
  measurementId: "G-50KZJMYC2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//create initial instance of auth functionality
export const auth = getAuth(app);