import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "./firebase";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  stream: string;
  year: string;
  isAdmin: boolean;
  createdAt: Date;
}

export const signIn = async (email: string, password: string) => {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase authentication is not configured');
  }
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signUp = async (
  email: string, 
  password: string, 
  name: string, 
  stream: string, 
  year: string
) => {
  if (!isFirebaseConfigured || !auth || !db) {
    throw new Error('Firebase authentication and database are not configured');
  }
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user profile in Firestore
    const userProfile: Omit<UserProfile, 'uid'> = {
      email,
      name,
      stream,
      year,
      isAdmin: email === 'tansurvii2124@gmail.com', // Make this specific email an admin
      createdAt: new Date(),
    };
    
    await setDoc(doc(db, 'users', result.user.uid), userProfile);
    
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signOutUser = async () => {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase authentication is not configured');
  }
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!isFirebaseConfigured || !db) {
    console.warn('Firebase database is not configured');
    return null;
  }
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const userData = { uid, ...docSnap.data() } as UserProfile;
      return userData;
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};
