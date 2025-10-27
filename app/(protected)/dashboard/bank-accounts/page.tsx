'use client'; 
import { getPixAccount } from "@/actions/get-pix-accounts";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase.config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import { DataTable } from "./table/table";

export default function BankAccounts() {
 
  const [ loading, error] =  useIdToken(auth);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getPixAccount({ companyToken: '716a0432-de30-4d81-8b08-70f2366f5878' })
      .then(({data}) => {
        console.log('Pix Account', data)
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
        <DataTable data={data}/> 
      </div>
    </>
  );
}
