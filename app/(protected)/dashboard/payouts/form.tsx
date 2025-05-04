'use client'
import { createQuote } from "@/actions/create-quote";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase.config";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

export default function Form() {

    const [user ] =  useAuthState(auth)
    const [ data, setData ] = useState('')

    const onSubmit = async () => { 
        const result  = await createQuote({
            fiatType: "BRL",
            cryptoType: "USDT",
            address: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
            country: "AO",
            fiatAmount: 50,
            companyToken: '2ec41b21-2387-499e-84c3-a7b1712a688b'
        }); 

        if (result.success) {
            toast.success('Quote created successfully')
            setData(result.data as string);
            console.log("Quote created successfully", JSON.stringify(result.data));
        } else {
            console.log("Error creating quote", result.message);
            toast.error('Error creating quote', {
                description: 'Please check the data you provided: ' + result.message, richColors: true,
            })
            
        } 
    }

  return (
    <div className="flex flex-col gap-y-5">
        <p>Form</p>
        <Button onClick={() => onSubmit()}>Submit</Button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
