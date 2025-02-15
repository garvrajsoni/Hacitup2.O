// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSfnnjd4KtAlBqFPKZ982RZ4q8tOJzKnE",
  authDomain: "hackitup-faa5f.firebaseapp.com",
  projectId: "hackitup-faa5f",
  storageBucket: "hackitup-faa5f.firebasestorage.app",
  messagingSenderId: "372407405746",
  appId: "1:372407405746:web:effe6c1ea5faf87896cdab",
  databaseURL: "https://hackitup-faa5f-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);