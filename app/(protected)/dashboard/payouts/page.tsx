import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <DashboardHeader
        heading="Payouts"
        text="Create and manage payouts"
      >
        <Link href="/dashboard/payouts/new"> 
          <Button>New payout</Button>
        </Link>
      </DashboardHeader>
      <div className="grid gap-8">
        <p>Payouts</p>
        {/* <Form /> */}
      </div>
    </>
  );
}
