import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvf5c5UAM5DkLWY7qUhICFulMTWzRPeYw",
  authDomain: "foodapp-9fa94.firebaseapp.com",
  databaseURL: "https://foodapp-9fa94-default-rtdb.firebaseio.com",
  projectId: "foodapp-9fa94",
  storageBucket: "foodapp-9fa94.appspot.com",
  messagingSenderId: "702131009729",
  appId: "1:702131009729:web:d071aeaa6ea7a9e68b7c40",
};

const app = initializeApp(firebaseConfig);
export default app;
