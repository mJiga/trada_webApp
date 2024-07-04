import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: "trada-29ce0.firebaseapp.com",
  projectId: "trada-29ce0",
  storageBucket: "trada-29ce0.appspot.com",
  messagingSenderId: "514812685422",
  appId: "1:514812685422:web:aabfdcb12483196749ca7f",
  measurementId: "G-52TX2RH3ZN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
