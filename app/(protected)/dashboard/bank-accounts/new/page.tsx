import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import NewForm from "./newForm";

export default function NewPayoutAccount() {
 

  return (
    <DashboardShell>
        <DashboardHeader
        heading="Add payout account"
        text="Add new payout account"
      />
      <div>
        <NewForm />
      </div>
    </DashboardShell>
  )
}
