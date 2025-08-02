// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAY4qhhl3t2fMF0dirAfVYsxg8FyDer_5o",
  authDomain: "sakhi-room-matcher.firebaseapp.com",
  projectId: "sakhi-room-matcher",
  storageBucket: "sakhi-room-matcher.firebasestorage.app",
  messagingSenderId: "235194599107",
  appId: "1:235194599107:web:3e9135c0e8a3cfc1858476",
//   measurementId: "G-LMQL52P51W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {auth, db};
