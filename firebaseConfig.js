import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRM5eyHs10SbecXEQHgnpU_7-a-UMvUHc",
  authDomain: "airy-adapter-451212-b8.firebaseapp.com",
  projectId: "airy-adapter-451212-b8",
  storageBucket: "airy-adapter-451212-b8.firebasestorage.app",
  messagingSenderId: "17344691036",
  appId: "1:17344691036:web:6b3251d88a99d7e06cdf99",
  measurementId: "G-M0NM2HV8TG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
auth.useDeviceLanguage();

const signInAdmin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export { db, auth, app, signInAdmin };
