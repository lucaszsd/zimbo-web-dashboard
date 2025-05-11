import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import Form from "./form";

export default function NewPayoutAccount() {
 

  return (
    <DashboardShell>
        <DashboardHeader
        heading="Add payout account"
        text="Add new payout account"
      />
      <div className="w-full max-w-2xl space-y-4 mx-auto">
        <Form />
      </div>
    </DashboardShell>
  )
}
