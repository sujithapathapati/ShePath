// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "shepath-8d2eb.firebaseapp.com",
  projectId: "shepath-8d2eb",
  storageBucket: "shepath-8d2eb.appspot.com", // fix here too if needed
  messagingSenderId: "801882840014",
  appId: "1:801882840014:web:d612f83a0a2515cfbca99f",
  measurementId: "G-EB5WS91YZB"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Export auth and db
export const auth = getAuth(app);
export const db = getFirestore(app);
