// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFubGRhEvLu6NHwl11AbNQiAY1UlOI-UM",
  authDomain: "oceanova-526f0.firebaseapp.com",
  projectId: "oceanova-526f0",
  storageBucket: "oceanova-526f0.firebasestorage.app",
  messagingSenderId: "181820101308",
  appId: "1:181820101308:web:d244468763d175e0a176b9",
  measurementId: "G-5MC58XRMMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);