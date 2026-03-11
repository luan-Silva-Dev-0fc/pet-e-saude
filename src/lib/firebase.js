import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSgK5se00FHX3GISZyQlwykN3wK6m8bbQ",
  authDomain: "pet-e-saude.firebaseapp.com",
  projectId: "pet-e-saude",
  storageBucket: "pet-e-saude.firebasestorage.app",
  messagingSenderId: "1029990237805",
  appId: "1:1029990237805:web:e78b5fe0af10de71b66164",
  measurementId: "G-4XE8XLP3PK",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
