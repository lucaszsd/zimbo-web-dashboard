import { DashboardHeader } from "@/components/dashboard/header";

export default function Page() {
  return (
    <>
      <DashboardHeader
        heading="Webhooks"
        text="Create and manage webhooks"
      />
      <div className="grid gap-8">
        <p>Webhooks</p>
      </div>
    </>
  );
}
