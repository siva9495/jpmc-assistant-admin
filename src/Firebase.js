// Firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCj-HsTXsdtaumyPvDB8z-RU9TSwcCQLVs",
  authDomain: "jpmcaireceptionist.firebaseapp.com",
  databaseURL: "https://jpmcaireceptionist-default-rtdb.firebaseio.com",
  projectId: "jpmcaireceptionist",
  storageBucket: "jpmcaireceptionist.appspot.com",
  messagingSenderId: "9222538440",
  appId: "1:9222538440:web:a4616724ebe578ac7291fd",
  measurementId: "G-L5NGYMPTN1",
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);

export { app, db, analytics };