// Firebase configuration ready - uncomment when you run npm install firebase
/*
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAtB2RU0Ek2xsLt2m6mX8IVWLslDRDStZw",
  authDomain: "focushub-f1320.firebaseapp.com",
  projectId: "focushub-f1320",
  storageBucket: "focushub-f1320.firebasestorage.app",
  messagingSenderId: "437953550940",
  appId: "1:437953550940:web:bae944ef49ea77d3ec6499"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
*/

// Stub function for now (localStorage mode)
export const initializeFirebase = () => {
  console.log('Firebase configured but not enabled - using localStorage mode');
  console.log('To enable: npm install, uncomment config above, rebuild');
  return null;
};
