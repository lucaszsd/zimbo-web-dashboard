'use client'; 
import { getPixAccount } from "@/actions/get-pix-accounts";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase.config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import { columns } from "./table/columns";
import { DataTable } from "./table/table";

export default function BankAccounts() {

  console.log('Auth', auth.currentUser)
 
  //  const { data: session } = useSession(); 
  // const { user } = useAuth()

  const [user, loading, error] =  useIdToken(auth);
  const [data, setData] = useState([]);
 

  useEffect(() => {
    getPixAccount({ companyToken: 'aed764db-1af7-47a6-aadd-2984a71bd60b' })
      .then(({data}) => {
        console.log('Pix Account', res)
        setData(data?.BankAccount)
      })
      .catch((err) => {
        console.log('Error', err)
      })
  })
  
 
  
   
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
          <DataTable columns={columns} data={data}/>
         </div>
      </div>
    </>
  );
}
