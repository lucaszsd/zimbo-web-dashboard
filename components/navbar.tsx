'use client';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase.config';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserAccountNav } from './layout/user-account-nav';
export default function Navbar() {

  const [ user ] = useAuthState(auth)

  const router = useRouter(); 
  return (
    <header className='w-full p-4  flex justify-between items-center border-b'>
      <div className='w-full flex justify-between items-center  max-w-5xl mx-auto '  >
        <img src='/brand/logo.svg' alt = 'Zimbo logo' className='h-7'/>
        {
          user ? (
            <div className='flex gap-4'>
              <Button onClick={() =>  router.push('/dashboard')}>Dashboard</Button>
              {/* <UserAvatar user = {user} /> */}
              <UserAccountNav />
              {/* <div className='flex items-center flex-col justify-center'> 
                <span>{user.displayName}</span>
                <img src = {user?.photoURL || ''} alt = 'User avatar'/>
              </div> */}
              {/* <Button onClick={() =>  signOut(auth)}>Logout</Button> */}
            </div>
          ) : 
          <div className='gap-4 flex'>
            <Button onClick={() => router.push('/sign-in')}>Login</Button>
            <Button onClick={() => router.push('/sign-up')}>Signup</Button>
          </div>
        }
      </div>
    </header>
  )
}
