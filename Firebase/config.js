// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnMmAnAw0o2SZ9AyakgE450XblGfadi0U",
  authDomain: "koll-app.firebaseapp.com",
  projectId: "koll-app",
  storageBucket: "koll-app.appspot.com",
  messagingSenderId: "485979616959",
  appId: "1:485979616959:web:b2e01a3949a6a5ed96780a",
  measurementId: "G-EVDPW5KD8M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
