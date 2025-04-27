'use client'
import { useAuth } from "@/components/context/firebaseAuth";
import DashboardHeader from "@/components/dashboard/dashboard-nav";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { redirect } from "next/navigation";
export default function Layout({children}: {children: React.ReactNode}) {
   
  const { user } = useAuth();
  
  if(!user) {  
    redirect('/sign-in');
  }
 
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
