 
import { UserAccountNav } from "@/components/layout/user-account-nav";
import { Button } from "@/components/ui/button";
import { Bell, Wallet } from "lucide-react";

export default function DashboardNav() { 
  return (
    <header className="sticky top-0 w-full z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8 items-center gap-6">
          {/* <MaxWidthWrapper className="flex max-w-7xl items-center gap-x-3  px-0">
            <MobileSheetSidebar links={filteredLinks} /> */}

            <div className="w-full">
              {/* TODO: Free space  */}
            </div>

            {/* <ModeToggle /> */}
            <Button>
              <Wallet size={18} />
              Conect Wallet
            </Button>
            <Button className="rounded-full" variant={"secondary"}>
              <Bell size={18} />
            </Button>
            <UserAccountNav />
             
            {/* <div className="bg-green-200 rounded-full w-12 h-12"></div> */}
            {/* <UserAccountNav /> */}
            {/* 
          </MaxWidthWrapper> */}
        </header>
  )
}
