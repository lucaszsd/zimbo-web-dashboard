'use client';
import Navbar from '@/components/navbar';
export default function Layout({children}) {
  
     
  return (
    <>
        {/* here goes navbar */}

        <Navbar />
        {/* {JSON.stringify(user)} */}
        {children}
    </>
  )
}
