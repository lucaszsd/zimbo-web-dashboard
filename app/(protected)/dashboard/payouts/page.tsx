import { DashboardHeader } from "@/components/dashboard/header";

export default function Page() {
  return (
    <>
      <DashboardHeader
        heading="Payouts"
        text="Create and manage payouts"
      />
      <div className="grid gap-8">
        <p>Payouts</p>
      </div>
    </>
  );
}
