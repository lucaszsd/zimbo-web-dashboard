'use client'
import { ReactNode } from 'react'
  
import { Loader2, SaveIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from './ui/button'

type SaveButton = {
  children: ReactNode,
  props?: ButtonProps, 
  disabled?: boolean
  color?: string
}

export default function SaveButton({children, props, color,  disabled = false}: SaveButton) {
  
    const {pending} =  useFormStatus()

    return (
    <>
      {pending ?
      <Button {...props} disabled className='text-white bg-black' style={color ? {backgroundColor: color} : {}}>
        <Loader2 className='w-4 h-4 animate-spin'/>            
      </Button>   :
      <Button {...props} disabled = {disabled} type = {'submit'} className={'py-3 text-white bg-black rounded-md'}  style={color ? {backgroundColor: color,} : {}}>
        <SaveIcon className='w-4 h-4 mr-2'/>
        {children}
      </Button>}
    </>
  )
}
