// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4c15_4Z07G8OHIJG6nSc-CWB58Sb3RLE",
  authDomain: "coffeeshopwebtask1.firebaseapp.com",
  projectId: "coffeeshopwebtask1",
  storageBucket: "coffeeshopwebtask1.firebasestorage.app",
  messagingSenderId: "937110008513",
  appId: "1:937110008513:web:67c4816c386871104dda40",
  measurementId: "G-Z1TKNNJKYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);