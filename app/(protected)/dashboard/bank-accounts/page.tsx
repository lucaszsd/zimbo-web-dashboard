'use client';
import { useAuth } from "@/components/context/firebaseAuth";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default  function BankAccounts() {

    const { user } = useAuth();

  console.log('Sarch', JSON.stringify(user));
  const postData = async () => {
    
    
    // const result = await generateApiKey({companyId: process.env.COMPANY_ID as string, firebaseToken: 'asdas'});
    // console.log('user', result)

  }

  postData();
 
   
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
         </div>
      </div>
    </>
  );
}
