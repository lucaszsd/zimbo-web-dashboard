'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
export default function SignUp() {

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
  const router = useRouter();
  const signup = async () => {
    try {
      await signInWithGoogle()
      router.push('/dashboard')
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
    <Card className='w-1/3 aspect-[4/5] bg-white'>
      <CardHeader>
        <CardTitle className='font-semibold text-xl'>Signup</CardTitle>
        <CardDescription>Create your free account to start using our stablecoins API</CardDescription>
      </CardHeader>
      <CardContent>
        <button className='w-full h-12 bg-blue-500 rounded-md text-white' onClick={() => signup() }>Sign Up with Google</button>
      </CardContent>
      <CardFooter className='flex flex-col gap-4'>
        <p>Already have an account? <Link href='/sign-in' className='text-blue-500'>Sign in</Link></p>
        <p className='text-xs'>By continue you accept out <Link className='text-blue-500' href={'/privacy-policy'}>terms of service</Link> and <Link className='text-blue-500' href={'/privacy-policy'}>privacy policy</Link></p>
      </CardFooter>
    </Card> 
  )
}
