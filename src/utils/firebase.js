// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVwviXheby3U1LfTbKTMAvmj6PKB7tzLQ",
  authDomain: "ssd-dev-storage.firebaseapp.com",
  projectId: "ssd-dev-storage",
  storageBucket: "ssd-dev-storage.appspot.com",
  messagingSenderId: "294949356368",
  appId: "1:294949356368:web:fdb20f082d9d16910ae255"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);