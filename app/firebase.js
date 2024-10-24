// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH1MSl7Y8uNJyiD4T3K8M2auhJ3EG5-gE",
  authDomain: "house-of-virasat-shop.firebaseapp.com",
  projectId: "house-of-virasat-shop",
  storageBucket: "house-of-virasat-shop.appspot.com",
  messagingSenderId: "183522735926",
  appId: "1:183522735926:web:4b7c56c4625baa10dce597",
  measurementId: "G-5K0SBTTSHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// ref: how to use firebase - https://firebase.google.com/learn/pathways/firebase-web