import { DashboardHeader } from "@/components/dashboard/header";
 
export default async function Page() {
 
  return (
    <>
      <DashboardHeader
        heading="Enviroment"
        text="Manage development enviroment"
      />
      <div className="grid gap-8">
        <p>Team</p> 
      </div>
    </>
  );
}
