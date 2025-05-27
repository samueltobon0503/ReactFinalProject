import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyB-36XtYzd882LEstRQD3L1UDExqscNrnw",
  authDomain: "spotify-consumer-a0b36.firebaseapp.com",
  projectId: "spotify-consumer-a0b36",
  storageBucket: "spotify-consumer-a0b36.firebasestorage.app",
  messagingSenderId: "903733648007",
  appId: "1:903733648007:web:69d019ee0aaf27297b3622"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);