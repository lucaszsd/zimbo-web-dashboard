"use client"
import { Button } from "@/components/ui/button"
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

type SelectorProps = {
  title: string,
  options?: string[]
  setValue: (value: string) => void 
}

//Needs to be inside a Tooltip provider
function Selector({title = "Network", setValue}: SelectorProps) {
  const [network, setNetwork] = React.useState<'ethereum' | 'base' | 'polygon'>("ethereum")
 
    const networks_available = {
        'ethereum': {
            name: "Ethereum",
            icon: "ethereum",
            tokens: []
        },
        'base': {
            name: "Base",
            icon: "base",
            tokens: []
        },
        "polygon": {
            name: "Polygon",
            icon: "polygon",
            tokens: []
        }
    }
    
    const updateValue = (value: keyof typeof networks_available) => {
      setNetwork(value)
      setValue(value) 
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild> 
        <div className="p-2 border rounded-md flex flex-row space-between items-center justify-between hover:bg-gray-100 ">  
            <div className="flex flex-row gap-2 items-center">
            <Button>
                {/* {networks_available[network || 'development'].icon } */}
                <Bug size={18} />
            </Button>
                {
                     
                    <div> 
                        <p className="text-xs">{title}</p>
                        <p className="text-sm font-semibold">{network}</p>
                    </div>
                }
            </div>
                {
                      <ChevronsUpDown className="size-5" />
                }
        </div>
        
           
             
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Network</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={network} onValueChange={value => {updateValue(value as keyof typeof networks_available) }}>
            
          <DropdownMenuRadioItem value="polygon">
            Polygon
            <Bug />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ethereum">
            Ethereum
            <Rocket />
          </DropdownMenuRadioItem> 
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Selector