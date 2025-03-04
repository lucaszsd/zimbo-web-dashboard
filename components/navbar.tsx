'use client';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
export default function Navbar() {

  const [user, loading, error] = useAuthState(auth)
  const router = useRouter();
  console.log('user', user)
  return (
    <header className='w-full p-4 bg-gray-100 flex justify-between items-center'>
      <div className='w-full flex justify-between items-center bg-red-50 max-w-5xl mx-auto'>
        <img alt = 'Zimbo logo'/>
        {
          user ? (
            <div>
              <Button onClick={() =>  router.push('/dashboard')}>Dashboard</Button>
              <div className='flex items-center flex-col justify-center'> 
                <span>{user.displayName}</span>
                <img src = {user?.photoURL || ''} alt = 'User avatar'/>
              </div>
              <Button onClick={() =>  signOut(auth)}>Logout</Button>
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
