import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyB-cN6ctAQKqxAyVC5GMrio1S8lV7OE9x8",
    authDomain: "cmi-pooling.firebaseapp.com",
    projectId: "cmi-pooling",
    storageBucket: "cmi-pooling.appspot.com",
    messagingSenderId: "599458450165",
    appId: "1:599458450165:web:994c8e1cfb5205280c53bc",
    measurementId: "G-6H27LD96BP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);