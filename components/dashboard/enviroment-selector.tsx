"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Bug, ChevronsUpDown, Rocket } from "lucide-react"
import * as React from "react"

//Needs to be inside a Tooltip provider
function EnvironmentSelector({isSidebarExpanded = true}: {isSidebarExpanded: boolean}) {
  const [position, setPosition] = React.useState<'development' | 'production'>("production")

    const environments = {
      'development': {
        name: "Development",
        color: "red",
        icon: <Bug size={18} />,
      },
      'production': {
        name: "Production",
        color: "green",
        icon: <Rocket size={18} />,
      }
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild> 
        <div className="p-2 border rounded-md flex flex-row space-between items-center justify-between hover:bg-gray-100 ">  
            <div className="flex flex-row gap-2 items-center">
                {environments[position || 'development'].icon }
                {
                    isSidebarExpanded &&
                    <div> 
                        <p className="text-xs">Environment:</p>
                        <p className="text-sm font-semibold">{environments[position || 'development'].name}</p>
                    </div>
                }
            </div>
                {
                    isSidebarExpanded && <ChevronsUpDown className="size-5" />
                }
        </div>
           
             
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Environment</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={value => setPosition(value as keyof typeof environments)}>
            
          <DropdownMenuRadioItem value="development">
            Development
            <Bug />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="production">
            Production
            <Rocket />
          </DropdownMenuRadioItem> 
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default EnvironmentSelector