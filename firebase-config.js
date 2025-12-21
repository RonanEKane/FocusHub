// ============================================
// FIREBASE CONFIGURATION
// ============================================

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJeuBD1TSL6gIZnr5sAKvTFYMj66ztzno",
  authDomain: "focushub-91094.firebaseapp.com",
  projectId: "focushub-91094",
  storageBucket: "focushub-91094.firebasestorage.app",
  messagingSenderId: "548003574834",
  appId: "1:548003574834:web:b19ed9ac4d4d84517bb82b"
};

// Import Firebase modules (using CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { auth, db };

console.log('Firebase initialized successfully');

