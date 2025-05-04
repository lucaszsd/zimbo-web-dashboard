'use client'
import { ReactNode } from 'react'
  
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button, ButtonProps } from './ui/button'

type SaveButton = {
  children: ReactNode,
  props?: ButtonProps, 
  disabled?: boolean
  color?: string
  
}

export default function SaveButton({children, props, color,  disabled = false}: SaveButton) {

    const router = useRouter()
     
    return ( 
      <Button {...props} disabled = {disabled} variant={'destructive'} onClick={() => router.back()} className={'py-3 text-white  rounded-md'}  style={color ? {backgroundColor: color,} : {}}>
        <ArrowLeft className='w-4 h-4 mr-2'/>
        {children || 'Cancel'}
      </Button> 
  )
}
