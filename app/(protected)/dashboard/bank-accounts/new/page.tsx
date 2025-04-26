import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Card } from "@/components/ui/card";
import Form from "./form";

export default function NewPayoutAccount() {
 

  return (
    <DashboardShell>
        <DashboardHeader
        heading="Add payout account"
        text="Add new payout account"
      />
      <div>
        {/* <p>Nova transação</p> */}
        <pre>
        
        </pre>
        <Card className="max-w-[800px] mx-auto">
            <Form />
        </Card>
      </div>
    </DashboardShell>
  )
}
