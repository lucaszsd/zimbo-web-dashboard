import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 ">
      {/* <DashboardHeader heading="Dashboard" text="Carregando..." /> */}
      <div className="w-full flex flex-row gap-4">
        <Skeleton className="w-full h-28 rounded-lg" />
        <Skeleton className="w-full h-28 rounded-lg" />
        <Skeleton className="w-full h-28 rounded-lg" />
        <Skeleton className="w-full h-28 rounded-lg" />
      </div>
      <Skeleton className="size-full h-screen rounded-lg" />
    </div>
  );
}
