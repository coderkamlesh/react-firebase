// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDP8MHIo-Oo_9CkogNFTyZt1ilJBudptb4",
  authDomain: "learn-75470.firebaseapp.com",
  projectId: "learn-75470",
  storageBucket: "learn-75470.appspot.com",
  messagingSenderId: "434128236446",
  appId: "1:434128236446:web:c497dde51ea2825515708f",
  measurementId: "G-TE0NP1JKLV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
