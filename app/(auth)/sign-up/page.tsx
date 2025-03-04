'use client';

import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
export default function SignUp() {

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
  const router = useRouter();
  const signup = async () => {
    try {
      await signInWithGoogle()
      router.push('/')
    } catch (error) {
      console.log('Signup error', JSON.stringify(error))
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  if (user) {
    return <div>User: {JSON.stringify(user)}</div>
  }

  return (
    <div className='w-full flex h-screen bg-gray-200 items-center justify-center'> 
      <div>
        <button className='w-80 h-80 bg-red-200' onClick={() => signup() }>Sign Up</button>
      </div>
    </div>
  )
}
