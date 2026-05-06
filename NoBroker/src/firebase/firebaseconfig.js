// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_Mn0O3q0hkBhLHfe9TPsTW4T8qeQ1saA",
  authDomain: "nobroker-512.firebaseapp.com",
  projectId: "nobroker-512",
  storageBucket: "nobroker-512.firebasestorage.app",
  messagingSenderId: "276609789924",
  appId: "1:276609789924:web:9fafee75d2b62b1cbae1f1",
  measurementId: "G-FLHRY6NEBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

console.log('Firebase app initialized:', app);
console.log('Firestore db:', db);