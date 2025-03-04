import React from 'react'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className='w-full items-center justify-between p-10 min-h-screen text-gray-800'> 
        {children}
    </div>
  )
}
