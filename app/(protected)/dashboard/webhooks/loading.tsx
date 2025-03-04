import { DashboardHeader } from "@/components/dashboard/header";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <DashboardHeader
        heading="Payins"
        text="Create and manage payins"
      />
      <div className="grid gap-8">
        <Skeleton className="h-28 w-full rounded-lg md:h-24" /> 
      </div>
    </>
  );
}
