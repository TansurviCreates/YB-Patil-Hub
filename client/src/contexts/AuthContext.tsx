import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { getUserProfile, UserProfile } from '@/lib/auth';

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      // If Firebase is not configured, set loading to false immediately
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        let profile = await getUserProfile(firebaseUser.uid);
        
        // Temporary workaround: If profile can't be retrieved but user is admin email, create admin profile
        if (!profile && firebaseUser.email === 'tansurvii2124@gmail.com') {
          profile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: 'Administrator',
            stream: 'Admin',
            year: 'Admin',
            isAdmin: true,
            createdAt: new Date(),
          };
        }
        
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
