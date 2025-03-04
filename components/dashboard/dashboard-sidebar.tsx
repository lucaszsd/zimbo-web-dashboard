'use client'
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Badge, BookText, LucideIcon, PanelLeftClose, PanelRightClose } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
// import { Icons } from "./shared/icons";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import EnvironmentSelector from "./enviroment-selector";
 
export type NavItem = {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean; 
  // icon?: keyof typeof Icons;
  icon?: string;
};

export type SidebarNavItem = {
  title: string;
  items: NavItem[]; 
  icon?: LucideIcon;
};

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
     
      { href: "/dashboard", icon: "dashboard", title: "Dashboard" },
      { href: "/dashboard/customers", icon: "dashboard", title: "Customers" },
      { href: "/dashboard/payins", icon: "dashboard", title: "Payins" },
      { href: "/dashboard/payouts", icon: "dashboard", title: "Payouts" },
      // {
      //   href: "/dashboard/billing",
      //   icon: "billing",
      //   title: "Billing",
      //   authorizeOnly: UserRole.USER,
      // },
      { href: "/dashboard/webhooks", icon: "fileInput", title: "Webhooks" },
      { href: "/dashboard/api-keys", icon: "smile", title: "API keys" },
      
      // { href: "/dashboard/charts", icon: "lineChart", title: "Charts" },
      // {
      //   href: "/admin",
      //   icon: "laptop",
      //   title: "Admin Panel",
      //   authorizeOnly: UserRole.ADMIN,
      // },
      //  {
      //   href: "admin/users",
      //   icon: "laptop",
      //   title: "users",
      //   authorizeOnly: UserRole.ADMIN,
      // },
      // {
      //   href: "/admin/orders",
      //   icon: "package",
      //   title: "Orders",
      //   badge: 2,
      //   authorizeOnly: UserRole.ADMIN,
      // },
      // {
      //   href: "#/dashboard/posts",
      //   icon: "post",
      //   title: "User Posts",
      //   authorizeOnly: UserRole.USER,
      //   disabled: true,
      // },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { href: "/dashboard/settings/fees", icon: "settings", title: "Setup fees" }, 
      { href: "/dashboard/settings/team", icon: "settings", title: "Team" }, 
      { href: "/dashboard/settings/enviroment", icon: "settings", title: "Enviroment Setup" },

      // { href: "/dashboard/settings", icon: "settings", title: "Configurações" },
      // { href: "/dashboard/billing", icon: "creditCard", title: "Cobrança" },
      // { href: "/", icon: "home", title: "Homepage" },
      // { href: "/docs", icon: "bookOpen", title: "Documentation" },
      // {
      //   href: "#",
      //   icon: "messages",
      //   title: "Support",
      //   authorizeOnly: UserRole.USER,
      //   disabled: true,
      // },
    ],
  },
];




export default function DashboardSidebar() {

  const path = usePathname();
    const { isTablet } = useMediaQuery();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(!isTablet);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    const router = useRouter();
  return (
    <TooltipProvider delayDuration={0}>
    
    <div className="sticky top-0 h-full ">
        <ScrollArea className="h-full overflow-y-auto border-r ">
          <aside
            className={cn(
              isSidebarExpanded ? "w-[220px] xl:w-[260px]" : "w-[68px]",
              "hidden h-screen md:block",
            )}>
              <div className="flex flex-col flex-1 h-full max-h-screen gap-2 ">
                 <div className="flex h-14 items-center p-4 lg:h-[60px]">
                {isSidebarExpanded ? 
                  
                  <Image draggable = {false} src="/brand/logo.svg" alt="Zimbo logo" width={100} height={32} />
                 : null}

                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-9 lg:size-8"
                  onClick={toggleSidebar}
                >
                  {isSidebarExpanded ? (
                    <PanelLeftClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  ) : (
                    <PanelRightClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  )}
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </div>
              <div className="p-4 w-full">
                  <EnvironmentSelector isSidebarExpanded = {isSidebarExpanded} />
                
              </div>
              <nav className="flex flex-col flex-1 gap-8 px-4 pt-4">
                {sidebarLinks.map((section) => (
                  <section
                    key={section.title}
                    className="flex flex-col gap-0.5"
                  >
                    {isSidebarExpanded ? (
                      <p className="text-xs text-muted-foreground">
                        {section.title}
                      </p>
                    ) : (
                      <div className="h-4" />
                    )}
                    {section.items.map((item) => {
                      // const Icon = Icons[item.icon || "arrowRight"];
                      return (
                        item.href && (
                          <Fragment key={`link-fragment-${item.title}`}>
                            {isSidebarExpanded ? (
                              <Link
                                key={`link-${item.title}`}
                                href={item.disabled ? "#" : item.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
                                  path === item.href
                                    ? "bg-muted"
                                    : "text-muted-foreground hover:text-accent-foreground",
                                  item.disabled &&
                                    "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground",
                                )}
                              > 
                              
                                {/* <Icon className="size-5" /> */}
                                {item.title}
                                {item.badge && (
                                  <Badge className="flex items-center justify-center ml-auto rounded-full size-5 shrink-0">
                                    {item.badge}
                                  </Badge>
                                )}
                              </Link>
                            ) : (
                              <Tooltip key={`tooltip-${item.title}`}>
                                <TooltipTrigger asChild>
                                  <Link
                                    key={`link-tooltip-${item.title}`}
                                    href={item.disabled ? "#" : item.href}
                                    className={cn(
                                      "flex items-center gap-3 rounded-md py-2 text-sm font-medium hover:bg-muted",
                                      path === item.href
                                        ? "bg-muted"
                                        : "text-muted-foreground hover:text-accent-foreground",
                                      item.disabled &&
                                        "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground",
                                    )}
                                  >
                                    <span className="flex items-center justify-center size-full">
                                      {/* <Icon className="size-5" /> */}
                                    </span>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                  {item.title}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </Fragment>
                        )
                      );
                    })}
                  </section>
                ))}
              </nav>

              <div className="flex flex-col mt-auto mb-2  xl:p-4 gap-y-4 bottom-0">
                  {/* {isSidebarExpanded ? <UpgradeCard /> : null} */}
                  <Button variant="outline" onClick={() => router.push('/docs')} className="w-full gap-x-2 ">
                  <BookText className="size-5" />
                  {
                    isSidebarExpanded ? "Docs" : null
                  } 
                </Button>
              </div>
            </div>
          </aside>
        </ScrollArea>
    </div>
    </TooltipProvider>
  )
}
