'use client'

import { useAuth } from "@/components/context/firebaseAuth"

export default function Home() {

  const { user } = useAuth()
  return (
    <div>
      Home Page

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}
