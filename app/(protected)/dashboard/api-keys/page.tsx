import { DashboardHeader } from "@/components/dashboard/header";
import ApiKey from "./apikey";

export default function Page() {
  return (
    <>
      <DashboardHeader
        heading="API Keys"
        text="The API key is used to authenticate your requests."
      />
      <div className="grid gap-8"> 
        <ApiKey />
      </div>
    </>
  );
}
