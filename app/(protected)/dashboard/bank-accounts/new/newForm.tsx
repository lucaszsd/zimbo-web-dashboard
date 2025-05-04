'use client'
import { createPixAccount } from "@/actions/create-pix-account"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function NewForm() {

    const [ data, setData ] = useState('loading...')

    const newAccount =  async ( )=> {
       const result = await createPixAccount({
            companyToken: 'bdd7aae6-13da-4663-a306-758a8715fe82',
            fiatAccountSchema: 'PIXAccount',
            data: {
                institutionName: 'PIX Bank',
                accountName: 'My Account',
                fiatAccountType: 'BankAccount',
                keyType: 'RANDOM',
                key: 'ba359880-374c-43dd-ab93-945a7490dcc3'
            }
       })

       if(result.success) {
            console.log('Pix account created successfully', result.data)
            setData(result.data as string)
       } else {
            console.log('Error creating pix account', result.message)
       }
    }
    
    


  return (
    <div>NewForm
        <Button onClick={() => newAccount()}>
            Create Account
        </Button> 
        {<pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
