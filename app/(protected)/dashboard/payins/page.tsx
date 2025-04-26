import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <DashboardHeader
        heading="Payins"
        text="Create and manage payins"

      >
        <Button>New Payout</Button>
      </DashboardHeader>
      <div className="grid gap-8">
         <div>
          <p>Nova transação</p>
         </div>
      </div>
    </>
  );
}
