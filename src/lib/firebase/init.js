import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBVoN5NyMr4BtLPlDqFfbnFIqKikzVMrTQ",
  authDomain: "plant-tracker-c90cb.firebaseapp.com",
  projectId: "plant-tracker-c90cb",
  storageBucket: "plant-tracker-c90cb.appspot.com",
  messagingSenderId: "875423458247",
  appId: "1:875423458247:web:622b3848f89f76a6f52fe2",
  measurementId: "G-NTHBBT02GR"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);