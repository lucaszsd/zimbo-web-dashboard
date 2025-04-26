import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BankAccounts() {
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
