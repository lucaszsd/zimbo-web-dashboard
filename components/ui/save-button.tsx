'use client'
import React from 'react'
 
import { Loader2, SaveIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from './button'

export default function SaveButton({children, props}: {children: React.ReactNode, props?: ButtonProps}) {
  
    const {pending} =  useFormStatus()
    return (
    <>
    {pending ?
    <Button {...props} disabled className='text-white bg-black' >
      <Loader2 className='w-4 h-4 animate-spin'/>            
    </Button>   :
    <Button {...props} type = 'submit' className='py-3 text-white bg-black rounded-md '>
      <SaveIcon className='w-4 h-4 mr-2'/>
      {children}
    </Button>}
    </>
  )
}
