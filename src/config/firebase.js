// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyC359_j1OkeUjEotOi_Vc7fQbCGjF1T070",
  authDomain: "admin-login-7732c.firebaseapp.com",
  databaseURL:"https://admin-login-7732c-default-rtdb.firebaseio.com/",
  projectId: "admin-login-7732c",
  storageBucket: "admin-login-7732c.firebasestorage.app",
  messagingSenderId: "602807097115",
  appId: "1:602807097115:web:a52c6ec6a7172366f125be",
  measurementId: "G-7PE8DYL8JE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);