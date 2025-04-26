import DashboardHeader from "@/components/dashboard/dashboard-nav";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

export default function Layout({children}: {children: React.ReactNode}) {
  
  // TODO: Redirect
 
  return (
    <div className="relative flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex flex-1 bg-gray-50 h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 p-4 xl:px-8">
          {children}
        </main> 
      </div>
    </div>
  )
}
