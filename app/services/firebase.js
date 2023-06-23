
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOfg2APUqzzI95RyfiAn_BmXz5kc6cz_g",
  authDomain: "foodlist-67a90.firebaseapp.com",
  projectId: "foodlist-67a90",
  storageBucket: "foodlist-67a90.appspot.com",
  messagingSenderId: "805103942428",
  appId: "1:805103942428:web:f8334e7d91dc128ffdd8d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;