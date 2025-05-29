'use client'
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
 
 
import { createQuote } from "@/actions/create-quote";
import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/components/ui/table";
 
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import CustomSelector from "./selector";

// const networks_available = {
    
//     ethereum: {
//         name: "Ethereum",
//         icon: "Ethereum",
//         tokens: [
//             {
//                 name: "USDC",
//                 icon: "USDC",
//                 address: "0x"
//             }
//         ],
//     },
//     base: {
//         name: "Base",
//         icon: "Base",
//         tokens: [
//             {
//                 name: "USDC",
//                 icon: "USDC",
//                 address: "0x"
//             }
//         ],
//     }

// }

export default function NewPayout() {

    const network_options = [
        { 
            name: "Ethereum Mainnet",
            id: "ethereum",
            icon: "/icons/networks/ethereum.svg",
            available: true,
        },
         {
            name: "Polygon",
            id: "polygon",
            icon: "/icons/networks/polygon.svg",
            available: true,
        },
          { 
            name: "Stellar",
            id: "stellar",
            icon: "/icons/networks/stellar.svg",
            available: false,
        },
    ]

    const token_options = [
        {
            name: "USDC",
            id: "USDC",
            icon: "/icons/tokens/usdc.svg",
            address: "0x",
            network: "ethereum",
        },
        {
            name: "USDT",
            id: "USDT",
            icon: "/icons/tokens/usdt.svg",
            address: "0x",
            network: "ethereum",
        },  
        {
            name: "Polygon USDC",
            id: "USDC",
            icon: "/icons/tokens/usdt.svg",
            address: "0x",
            network: "polygon",
        },  
        {
            name: "XLM",
            id: "XLM",
            icon: "/icons/tokens/xlm.svg",
            address: "0x",
            network: "stellar",
        },
        {
            name: "XRP",
            id: "XRP",
            icon: "/icons/tokens/xrp.svg",
            address: "0x",
            network: "stellar",
        },
    ]

    const account_types = [
        {
            name: "Pix",
            id: "pix",
            icon: "/icons/flags/br.svg", 
            available: true,  
        },
        // {
        //     name: "Sepa",
        //     id: "sepa",
        //     icon: "/icons/flags/eu.svg", 
        //     available: false,  
        // },
        // {
        //     name: "Wire",
        //     id: "wire",
        //     icon: "/icons/flags/us.svg", 
        //     available: false,  
        // },
        // {
        //     name: "Faster Payments",
        //     id: "uk_faster_payment",
        //     icon: "/icons/flags/gb.svg",
        //     available: false,  
        // },
    ]
// Note: The token options are filtered by network, so only the tokens that match the selected network will be displayed
    // Filter tokens by network === "stellar"


    const [network, setNetwork] = useState<string>(network_options[0].id) //Default value is the first option
    const [token, setToken] = useState<string>() //Default value is the first option
   
    const filterByNetwork = (network: string) => {
        const filtered = token_options.filter(token => token.network === network) 

        return filtered
    }
    const filtered_tokens = filterByNetwork(network)

    useEffect(() => {
        setToken(filtered_tokens[0].id) //Set the default value to the first option of the filtered tokens
    }, [network])

    
    const requestQuote = async () => {
        const { data, success, message}  = await createQuote({companyToken: "716a0432-de30-4d81-8b08-70f2366f5878",})


        if (success) {
            alert("Payout created successfully");
            
        } else {
            alert(`Error creating payout: ${message}`);
        }

    }


    const dialogOpen = () => {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Request quote</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Payout</DialogTitle>
                    <DialogDescription>
                        Send a payment to a bank account or crypto wallet.
                    </DialogDescription>
                    <div>
                    </div>
                    </DialogHeader> 
                        <Alert>
                            <Clock className="h-4 w-4" />
                            <AlertTitle>Sua cotação tem validade de 5:00 minutos.</AlertTitle>    
                        </Alert>
                        {/* <Label>
                            Payout details
                        </Label> */}
                        <Table className="w-full h-6" >
                            <TableBody className="w-full">
                            <TableRow className="">
                                <TableCell className="font-medium">Payout method</TableCell>
                                <TableCell className="text-right">
                                <img src="/icons/flags/br.svg" alt="Brazilian flag" className="w-4 h-4 inline-block mr-2 rounded-full" />
                                Pix</TableCell>
                            </TableRow>
                            <TableRow className="">
                                <TableCell className="font-medium">Origin network</TableCell>
                                <TableCell className="text-right">
                                <img src="/icons/networks/stellar.svg" alt="Brazilian flag" className="w-4 h-4 inline-block mr-2 rounded-full" />
                                Stellar</TableCell>
                            </TableRow>
                            <TableRow className="">
                                <TableCell className="font-medium">Token</TableCell>
                                <TableCell className="text-right">
                                <img src="/icons/tokens/xlm.svg" alt="Brazilian flag" className="w-4 h-4 inline-block mr-2 rounded-full" />
                                XLM</TableCell>
                            </TableRow>
                            </TableBody>
                            <TableFooter className="w-full">
                                <TableRow className="border-b">
                                    <TableCell className="font-medium">Payout amount in BRL</TableCell>
                                    <TableCell className="text-right">R$ 50.00</TableCell>
                                </TableRow> 
                            </TableFooter>
                        </Table>
                        <Table className="w-full h-6" >
                            <TableBody className="w-full"> 
                                 <TableRow className="border-b">
                                    <TableCell className="font-medium">Exchange rate</TableCell>
                                    <TableCell className="text-right">
                                        1 XLM = 1.73 BRL
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-b">
                                    <TableCell className="font-medium">Service fee</TableCell>
                                    <TableCell className="text-right">
                                        R$ 0.00
                                    </TableCell> 
                                </TableRow>
                                <TableRow className="border-b">
                                    <TableCell className="font-medium">Partner fee</TableCell>
                                    <TableCell className="text-right">
                                        R$ 0.00
                                    </TableCell>
                                    
                                </TableRow>
                                   <TableRow className="border-b">
                                    <TableCell className="font-medium">Amount in USD</TableCell>
                                    <TableCell className="text-right">
                                        $ 8.85
                                    </TableCell>
                            </TableRow>
                           
                            
                            </TableBody>
                            <TableFooter className="border-t">
                             <TableRow className="border-b">
                                    <TableCell className="font-medium">Total in XLM</TableCell>
                                    <TableCell className="text-right">
                                        31.00 XLM
                                    </TableCell>
                            </TableRow>
                            </TableFooter>
                        </Table> 
                    <DialogFooter>  
                    <Button type="submit" onClick={() => requestQuote()}>Proceed to payment</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

  return (
    <div className="gap-6 flex flex-col">
        <DashboardHeader heading="Payouts" text="Insert payout details" />
        
        <div className="w-full max-w-2xl mx-auto bg-red-0 gap-6 flex flex-col">
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Origin Currency</CardTitle>
                {`${network} ${token}`} 
                <CardDescription>Select your payout details</CardDescription>
                
            </CardHeader>
            
            <CardContent className="grid grid-cols-2 gap-4">   
                <CustomSelector title="Network" options={network_options} setValue={setNetwork} />
                <CustomSelector title="Token" key={network} options={filtered_tokens} setValue={setToken}/> 
            </CardContent>
        </Card>
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Destiny payout</CardTitle>
                <CardDescription>Select your payout destiny account</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {/* <CustomSelector title="Payment Method" />
                <CustomSelector title="Token" />  */}

                {/* <CustomSelector title="Payment method" options={account_types} setValue={setNetwork} /> */}
                <CustomSelector title="Account"  options={account_types} setValue={setToken}/> 
                <Input placeholder="Account id"  className="col-span-1" />
                {/* {JSON.stringify(accounts)} */}
            </CardContent>
        </Card>
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Payout value</CardTitle>
                {/* <CardDescription>Select your payout destiny account</CardDescription> */}
            </CardHeader>
            <CardContent className="grid grid-cols-3gap-y-5 gap-x-4">
                {/* <p>Cover fees</p>
                <p>Partner fees</p> */}
             
                    <Input placeholder="Payout value" className="col-span-1" />
            </CardContent>
            <CardFooter className="flex gap-4 justify-end">
                <Button>Cancel</Button>
                <Button onClick={() => requestQuote()}>Request quote</Button>
            </CardFooter>
        </Card>
       
        </div>
    </div>
  )
}
