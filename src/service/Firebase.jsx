// src/service/Firebase.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-trip-planner-e5617.firebaseapp.com",
  projectId: "ai-trip-planner-e5617",
  storageBucket: "ai-trip-planner-e5617.appspot.com",
  messagingSenderId: "1059528358044",
  appId: "1:1059528358044:web:c612f8739101e2f2899559",
  measurementId: "G-MT60XFXLEC",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); 
