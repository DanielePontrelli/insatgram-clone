// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwltygHqPLg93sm3VhHasFgE_9TxEjRk0",
  authDomain: "instagram-clone-103f2.firebaseapp.com",
  databaseURL: "https://instagram-clone-103f2-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-103f2",
  storageBucket: "instagram-clone-103f2.appspot.com",
  messagingSenderId: "790799945648",
  appId: "1:790799945648:web:cce0ecfdd10ac89e115075",
  measurementId: "G-J6C96CHF7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);