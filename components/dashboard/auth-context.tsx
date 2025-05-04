'use client'
import { auth } from "@/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { User } from "firebase/auth";

const AuthContext = createContext({ user: null, signIn: () => {}, logOut: () => {}, status: 'loading' });


export const AuthProvider = ({ children }: {children: ReactNode}) => {

    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){ 
                setUser(user);
            }else{ 
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    
    const logOut = () => {
       return signOut(auth)
    }

    return ( 
        <AuthContext.Provider value={{ user, logOut, status }}>
            {children}
        </AuthContext.Provider> 
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}