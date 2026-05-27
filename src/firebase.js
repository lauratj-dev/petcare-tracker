import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDd915QztXQ1FX2KNqi1aR-FjEOEDC0nlE",
  authDomain: "petcare-tracker-d0393.firebaseapp.com",
  projectId: "petcare-tracker-d0393",
  storageBucket: "petcare-tracker-d0393.firebasestorage.app",
  messagingSenderId: "111526007973",
  appId: "1:111526007973:web:d25375ef7189748d4a694c",
  measurementId: "G-ZGBBS7RJMT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);