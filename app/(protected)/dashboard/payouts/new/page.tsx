'use client'
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Selector from "./selector";

const networks_available = {
    
    ethereum: {
        name: "Ethereum",
        icon: "Ethereum",
        tokens: [
            {
                name: "USDC",
                icon: "USDC",
                address: "0x"
            }
        ],
    },
    base: {
        name: "Base",
        icon: "Base",
        tokens: [
            {
                name: "USDC",
                icon: "USDC",
                address: "0x"
            }
        ],
    }

}

export default function NewPayout() {

    const [network, setNetwork] = useState<'poligon' | 'ethereum'>("poligon")

  return (
    <div className="gap-6 flex flex-col">
        <DashboardHeader heading="Payouts" text="Insert payout details" />
        <div className="w-full max-w-2xl mx-auto bg-red-0 gap-6 flex flex-col">
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Origin Currency</CardTitle>
                <CardDescription>Select your payout details</CardDescription>
            </CardHeader>
            
            <CardContent className="grid grid-cols-2 gap-4">   
                <Selector title="Network" />
                <Selector title="Token" /> 
            </CardContent>
        </Card>
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Destiny payout</CardTitle>
                <CardDescription>Select your payout destiny account</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <Selector title="Payment Method" />
                <Selector title="Token" /> 
            </CardContent>
        </Card>
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Other options</CardTitle>
                {/* <CardDescription>Select your payout destiny account</CardDescription> */}
                <p>Cover fees</p>
                <p>Partner fees</p>
                <div>
                        <p>Value</p>
                        
                </div>
            </CardHeader>
        </Card>
        <div className="flex gap-4 justify-end bg-red-50">
            <Button>Cancel</Button>
            <Button>Request quote</Button>
        </div>
        </div>
    </div>
  )
}
