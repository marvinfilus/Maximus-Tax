// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
      apiKey: "AIzaSyDLPQNM7CjUWRqjBTyMfhp_qB0BkN_6ACA",
    authDomain: "ah-sendgrid.firebaseapp.com",
    projectId: "ah-sendgrid",
    storageBucket: "ah-sendgrid.appspot.com",
    messagingSenderId: "1010465105957",
    appId: "1:1010465105957:web:3dcc0e56883142858af7cc",
    measurementId: "G-2SYRWYE6DX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);