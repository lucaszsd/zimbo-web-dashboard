import { DashboardHeader } from "@/components/dashboard/header";
import ApiKey from "./apikey";

export default function Page() {
  return (
    <>
      <DashboardHeader
        heading="Webhooks"
        text="Create and manage webhooks"
      />
      <div className="grid gap-8">
        <p>Api Keys</p>
        <ApiKey />
      </div>
    </>
  );
}
