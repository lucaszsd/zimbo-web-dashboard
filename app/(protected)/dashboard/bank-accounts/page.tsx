'use client'; 
import { generateApiKey } from "@/actions/generate-api-key";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import Link from "next/link";
import { useState } from "react";
import { useIdToken } from "react-firebase-hooks/auth";

export default function BankAccounts() {

  console.log('Auth', auth.currentUser)
 
  //  const { data: session } = useSession(); 
  // const { user } = useAuth()

  const [user, loading, error] =  useIdToken(auth);
  const [data, setData] = useState('Nat');

  console.log('idToken', user?.getIdToken())

  const handleSignIn =  async () => {
    

    user?.getIdToken().then((token) => { 
      // setData(token)
      console.log('Token => ', token)
      generateApiKey({
        companyId: 'edb94301-097f-41c9-8a1e-e78138981a4f',
        firebaseToken: token
      }).then((res) => {
        setData(JSON.stringify(res))
      })
     })
     

  }
  
  handleSignIn( )
  
  
   
  return (
    <>
      <DashboardHeader
        heading="Bank Accounts"
        text="Create and manage payins" 
      >
        <Link href="/dashboard/bank-accounts/new">
          <Button>New Payout Account</Button>
        </Link>
      </DashboardHeader>
      <div className="grid gap-8">
         <div>
          <p>Nova transação</p>
          {JSON.stringify(data)}
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
         </div>
      </div>
    </>
  );
}
