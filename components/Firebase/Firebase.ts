// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6lyB4IzjKGKJ5aegP5R8k2cESOrTO_VA",
  authDomain: "jesha-app.firebaseapp.com",
  projectId: "jesha-app",
  storageBucket: "jesha-app.appspot.com",
  messagingSenderId: "988635790935",
  appId: "1:988635790935:web:56e08c6a64f175ac84ed12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
