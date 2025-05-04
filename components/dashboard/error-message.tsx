import React from 'react'

export default function ErrorMessage({children}: {children: React.ReactNode}) {
  return (
    <p className='text-red-900 text-xs'>{
        children
    }</p>
  )
}
