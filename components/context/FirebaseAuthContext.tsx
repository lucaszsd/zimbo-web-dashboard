'use client';

import { auth } from '@/firebase.config';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  getIdToken: Promise<string>;
}

const AuthContext = createContext({ user: null, signIn: () => {}, logOut: () => {}, status: 'loading' });



export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
 
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){ 
        setUser({
          uid: user?.uid || '',
          displayName: user?.displayName || null,
          email: user?.email || null,
          photoURL: user?.photoURL || null,
          getIdToken: user?.getIdToken() ||  null,
        });
      }else{ 
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logOut, status }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}