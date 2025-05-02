'use client'
import { auth } from '@/firebase.config'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Button } from './ui/button'

export default function Nav() { 

  const router = useRouter() 
  const [ user ] = useAuthState(auth)
 
  return (
    <div className='w-full h-16 bg-slate-900 text-white flex items-center justify-between px-4'>
    <Link href='/' >
      <p>Zimbo</p>
    </Link>
    {
      user ? (
        <div className='flex gap-4'>
          <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
          <Button onClick={ () => signOut(auth)}>Logout</Button>
        </div>
      ) : 
      <div className='gap-4 flex'>
       <Button onClick={() => router.push('/sign-in')}>
          Sign In
        </Button>
        <Button onClick={() => router.push('/sign-up')}>
          Sign Up
        </Button>
      </div>
    }
    </div>
  )
}
