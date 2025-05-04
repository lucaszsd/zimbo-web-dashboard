import { DashboardHeader } from "@/components/dashboard/header";
 
export default async function Page() {
 
  return (
    <>
      <DashboardHeader
        heading="Team"
        text="Manage team members and permissions"
      />
      <div className="grid gap-8">
        <p>Coming Soon</p> 
      </div>
    </>
  );
}
