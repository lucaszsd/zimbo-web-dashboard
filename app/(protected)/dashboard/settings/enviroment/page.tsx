import { DashboardHeader } from "@/components/dashboard/header";

export default function Page() {
  return (
    <>
      <DashboardHeader
        heading="Enviroment"
        text="Manage development enviroment"
      />
      <div className="grid gap-8">
        <p>Instance name</p>
        <p>Features</p>
        <p>Delete instance</p>
      </div>
    </>
  );
}
