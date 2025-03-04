'use client';
import Navbar from '@/components/navbar';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
export default function Layout({children}) {
 
    const [user] = useAuthState(auth)

     
  return (
    <>
        {/* here goes navbar */}

        <Navbar />
        {/* {JSON.stringify(user)} */}
        {children}
    </>
  )
}
