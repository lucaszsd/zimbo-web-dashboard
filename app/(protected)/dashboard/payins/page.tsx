import { DashboardHeader } from "@/components/dashboard/header";

export default function Page() {
  return (
    <>
      <DashboardHeader
        heading="Payins"
        text="Create and manage payins"
      />
      <div className="grid gap-8">
        <p>Payins</p>
      </div>
    </>
  );
}
