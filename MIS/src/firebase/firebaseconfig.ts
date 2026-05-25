import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyAHP2Ec3D3d-KV_IY-MIFy79cHJ6ordFO4",
  authDomain: "gem-mis-98eb9.firebaseapp.com",
  projectId: "gem-mis-98eb9",
  storageBucket: "gem-mis-98eb9.firebasestorage.app",
  messagingSenderId: "174247901690",
  appId: "1:174247901690:web:998f79694153cc69a0cc43",
  measurementId: "G-935Q1D97PW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('Firebase initialized for MIS app');
