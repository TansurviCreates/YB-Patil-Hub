import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Trim any spaces from environment variables
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim();
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY?.trim();
const appId = import.meta.env.VITE_FIREBASE_APP_ID?.trim();

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  projectId: projectId,
  storageBucket: `${projectId}.firebasestorage.app`,
  messagingSenderId: "123456789",
  appId: appId,
};


// Check if Firebase config is available
const isFirebaseConfigured = !!(apiKey && projectId && appId);

let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

if (isFirebaseConfigured) {
  try {
    // Try to get existing app first, or initialize new one
    try {
      app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    } catch {
      app = initializeApp(firebaseConfig);
    }
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
} else {
  console.warn('Firebase is not configured. Set VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, and VITE_FIREBASE_APP_ID environment variables.');
}

export { auth, db, storage, isFirebaseConfigured };
export default app;
