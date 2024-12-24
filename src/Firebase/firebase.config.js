// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMcTteCnEYHH9c2CYGD4uNaQLZftuM7CE",
  authDomain: "ep-authentication-ca6ea.firebaseapp.com",
  projectId: "ep-authentication-ca6ea",
  storageBucket: "ep-authentication-ca6ea.firebasestorage.app",
  messagingSenderId: "323578354136",
  appId: "1:323578354136:web:69e47b8dae673ae6bd3aad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;