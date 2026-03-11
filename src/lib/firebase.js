import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Suas credenciais reais do Pet e Saúde
const firebaseConfig = {
  apiKey: "AIzaSyCSgK5se00FHX3GISZyQlwykN3wK6m8bbQ",
  authDomain: "pet-e-saude.firebaseapp.com",
  projectId: "pet-e-saude",
  storageBucket: "pet-e-saude.firebasestorage.app",
  messagingSenderId: "1029990237805",
  appId: "1:1029990237805:web:e78b5fe0af10de71b66164",
  measurementId: "G-4XE8XLP3PK"
};

// Inicializa o Firebase garantindo que não crie múltiplas instâncias no Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exporta os serviços prontos para uso
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;