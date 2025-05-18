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
import { ChevronsUpDown } from "lucide-react"
import Image from "next/image"
import * as React from "react"
type SelectorProps = {
  title?: string,
  options?: string[]
  setValue: (value: string) => void 
}

//Needs to be inside a Tooltip provider
function Selector({setValue}: SelectorProps) {

  const account_types = {
    'pix': {
        name: "Pix",
        icon: "br.svg", 
        available: true,  
    },
    'sepa': {
        name: "Sepa",
        icon: "eu.svg", 
          available: false,  
    },
    'wire': {
        name: "Wire",
        icon: "us.svg", 
          available: false,  
    },
    'uk_faster_payment': {
        name: "Faster Payments",
        icon: "gb.svg",
          available: false,  
    },
  }

  const [method, setMethod] = React.useState<keyof typeof account_types>(Object.keys(account_types)[0] as keyof typeof account_types)
  
    const updateValue = (value: keyof typeof account_types) => {
      setMethod(value)
      setValue(value) 
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild> 
        <div className="p-2 border rounded-md flex flex-row space-between items-center justify-between hover:bg-gray-100 ">  
            <div className="flex flex-row gap-2 items-center"> 
              <Image src={`/flags/${account_types[method].icon}`} alt="flag" className="rounded-full" width={20} height={20} /> 
                { 
                  <div> 
                      {/* <p className="text-xs">{title}</p> */}
                      <p className="text-sm font-semibold">{account_types[method].name}</p>
                  </div>
                }

                <div className="text-xs text-gray-500">
                    {account_types[method].available ? 
                      <span className="text-green-500 sr-only">Available</span>
                      : <span className="text-gray-800 px-2 py-1 rounded-full bg-muted">Soon</span>
                      }
                </div>
            </div>
                {
                      <ChevronsUpDown className="size-5" />
                }
        </div>
        
           
             
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Account type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={method} onValueChange={value => {updateValue(value as keyof typeof account_types) }}>
          {
            Object.entries(account_types).map(([key, value]) => (
              <DropdownMenuRadioItem key={key} value={key}>
                <img src={`/flags/${value.icon}`} alt="flag" className="rounded-full" width={20} height={20} /> 
                {/* <Image src={`/flags/${value.icon}`} alt="flag" className="rounded-full" width={20} height={20} />  */}
                {/* <p className="text-xs">{title}</p> */}
                {value.name}
                {/* {value.icon} */}
              </DropdownMenuRadioItem>
            ))
          }
          {/* <DropdownMenuRadioItem value="polygon">
            Polygon
            <Bug />
          </DropdownMenuRadioItem> */}
          {/* <DropdownMenuRadioItem value="ethereum">
            Ethereum
            <Rocket />
          </DropdownMenuRadioItem>  */}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Selector