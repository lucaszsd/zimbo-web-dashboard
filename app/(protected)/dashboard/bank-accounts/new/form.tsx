'use client'
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InputMask } from "@/components/ui/masked-input";
import SaveButton from "@/components/ui/save-button";
import Link from "next/link";
import Selector from "../../payouts/new/selector";
 
import { useEffect } from "react";
import { create } from 'zustand';

type PixAccount = {
    pix_key: string,
    pix_type?: string,
    pix_name?: string,
}

type StoreState = {
    formState: {
        type: string, 
        title: string,
        account: PixAccount,
    }
}

type StoreActions = {
    setType: (type: string) => void,
    setTitle: (title: string) => void,
    setPixKey: (account: string) => void,
}

const BankAccountStore = create<StoreState & StoreActions>((set) => ({
    formState: {
        type: '12312',
        title: '123123',
        account: {
            pix_key: '',
            pix_type: '',
            pix_name: '',
        },
    },
    setType: (type: string) => set((state) => ({formState: {...state.formState, type: type}})),
    setTitle: (title: string) => set((state) => ({ formState: { ...state.formState, title } })),
    setPixKey: (pix_key: string) => set((state) => ({ formState: { ...state.formState, account: { ...state.formState.account, pix_key: pix_key } } })),
}))

export default function Form() {

    const cpf_mask = "ddd.ddd.ddd-dd"
    const cpf_replacement = { d: /\d/ } 
    async function postData(formData: FormData) {
        console.log('ADd accout forma dadta:', JSON.stringify(formData))
    }
  
    

    const formState = BankAccountStore((state) => state.formState)
    const setTypeAction = BankAccountStore((state) => state.setType)
    // const setPixKeyAction = BankAccountStore((state) => state.setPixKey)
    // const setAccountTypeAction = BankAccountStore(state => state.setType)
    // const setTitleAction = BankAccountStore((state) => state.setTitle)
     
    const update = (info:string) =>{
        alert('update' + info)
        console.log('update', info)
        setTypeAction(info)
    }

    // setTitleAction('Pix')
    useEffect(() => {
        setTypeAction('pix')
        // setAccountTypeAction('pix')
    }, [])
    // setPixKeyAction('123.456.789-00')

  return (
    <form action={postData}> 
        <pre>
            {JSON.stringify(formState, null, 2)}
        </pre>
        <CardHeader>
            <CardTitle>
                Account
            </CardTitle>
            <CardDescription>
                Add account details
            </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-y-5 py-6'>
        <div className="flex flex-col gap-y-2">
            <Selector title="Payout method" setValue={update}/>
        </div>
            <div className='flex flex-col gap-y-2 '>
                <Label>
                    PIX(remover mascara ou colocar a adequada)
                </Label> 
                <InputMask required name = 'cpf' mask={cpf_mask} replacement={cpf_replacement} placeholder = {'123.456.789-00'}/> 
                <p className="text-xs">Make sure the PIX key is correct</p>
            </div>  
        </CardContent>
        <CardFooter className='flex justify-between py-4'>
            <Link href={"/dashboard/bank-accounts"}>
          <Button variant={"destructive"} className='py-3 text-white rounded-md'>
              Cancel
          </Button>
            </Link>
          <SaveButton>Save account</SaveButton> 
        </CardFooter>
        </form>
  )
}
