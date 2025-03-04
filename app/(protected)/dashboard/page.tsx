'use client'
import { DashboardHeader } from "@/components/dashboard/header";
import InfoCard from "@/components/dashboard/info-card";

export default function Dashboard() {
  
  return (
    <div className="w-full flex flex-col gap-6 ">
      <DashboardHeader heading="Dashboard" text="Welcome to the dashboard" />
      <div className="grid grid-cols-4 gap-4">
        <InfoCard title="Total transactions" data={199} />
        <InfoCard title="Total transactions" data={199} />
        <InfoCard title="Total transactions" data={199} />
        <InfoCard title="Total transactions" data={199} />
      </div>
    </div>
  )
}
