'use client'
import SaveButton from "@/components/save-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";
import Selector from "./selector";
 
import { createPixAccount } from "@/actions/create-pix-account";
import ErrorMessage from "@/components/dashboard/error-message";
import { Input } from "@/components/ui/input";
import { InputMask } from "@/components/ui/masked-input";
import { PixAccountSchema, PixAccountType } from "@/types-and-schemas/accounts/pix";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { create } from 'zustand';

type PixAccount = {
    key: string,
    keyType?: string,
    fiatAccountType?: string,
    accountName?: string,
    institutionName?: string,
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
    setPixType: (account: string) => void,
}

const BankAccountStore = create<StoreState & StoreActions>((set) => ({
    formState: {
        type: 'pix',
        title: '123123',
        account: {
            key: '',
            keyType: '',
            accountName: '',
        },
    },
    setType: (type: string) => set((state) => ({formState: {...state.formState, type: type}})),
    setTitle: (title: string) => set((state) => ({ formState: { ...state.formState, title } })),
    setPixKey: (pix_key: string) => set((state) => ({ formState: { ...state.formState, account: { ...state.formState.account, pix_key: pix_key } } })),
    setPixType: (keyType: string) => set((state) => ({ formState: { ...state.formState, account: { ...state.formState.account, keyType: keyType } } })),
}))

export default function Form() {
  

    const formState = BankAccountStore((state) => state.formState)
    const setTypeAction = BankAccountStore((state) => state.setType)
    const setPixKeyTypeAction = BankAccountStore((state) => state.setPixType)
    // const setPixKeyAction = BankAccountStore((state) => state.setPixKey)
    // const setAccountTypeAction = BankAccountStore(state => state.setType)
    // const setTitleAction = BankAccountStore((state) => state.setTitle)
    const type = formState.type
    const update = (info:string) =>{
        // alert('update' + info)
        // console.log('update', info)
        setTypeAction(info)
    }

    // setTitleAction('Pix')
    useEffect(() => {
        setTypeAction('pix')
        // setAccountTypeAction('pix')
    }, [])
    // setPixKeyAction('123.456.789-00')

  return (
    
        <Card className="w-full"> 
        {/* <pre>
            {JSON.stringify(formState, null, 2)}
        </pre> */}
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
    
            { type === 'pix' && <AddPixAccount /> }
            { type !== 'pix' && <CommingSoon />}  
            {/* <div className='flex flex-col gap-y-2 '>
                <Label>
                    Account name
                </Label>  
                <Input required name = 'account_name' placeholder = {'Account name'}/>
            {/* <div className="flex flex-col gap-y-2">
                <Label>
                    Type of PIX key
                </Label> 
                <div className='flex flex-row gap-x-2'>
                    <Button variant={formState.account.keyType == 'CPF' ? 'default' : "outline"} onClick = {() => setPixKeyTypeAction('CPF')} type = 'button' className='text-xs text-gray-500 rounded-md'>
                        CPF
                    </Button>
                    <Button variant={formState.account.keyType == 'CNPJ' ? 'default' : "outline"} onClick = {() => setPixKeyTypeAction('CNPJ')} type = 'button' className='text-xs text-gray-500 rounded-md'>
                        CNPJ
                    </Button>
                    <Button variant={formState.account.keyType == 'EMAIL' ? 'default' : "outline"} onClick = {() => setPixKeyTypeAction('EMAIL')} type = 'button' className='text-xs text-gray-500 rounded-md'>
                        Email
                    </Button>
                    <Button variant={formState.account.keyType == ' PHONE' ? 'default' : "outline"} onClick = {() => setPixKeyTypeAction('PHONE')} type = 'button' className='text-xs text-gray-500 rounded-md'>
                        Phone
                    </Button>
                    <Button variant={formState.account.keyType == 'RANDOM' ? 'default' : "outline"} onClick = {() => setPixKeyTypeAction('RANDOM')} type = 'button' className='text-xs text-gray-500 rounded-md'>
                        Random
                    </Button>
                </div>
            </div> 
            <div className='flex flex-col gap-y-2 '>
                <Label>
                    PIX(remover mascara ou colocar a adequada)
                </Label>  
                <InputMask required name = 'cpf' mask={cpf_mask} replacement={cpf_replacement} placeholder = {'123.456.789-00'}/> 
                <p className="text-xs">Make sure the PIX key is correct</p>
            </div>   
            */}
        </CardContent>
     
        </Card>
  
  )
}


const AddPixAccount = () => {

    const formState = BankAccountStore((state) => state.formState)
    const setPixKeyTypeAction = BankAccountStore((state) => state.setPixType)

    const [pixType, setPixType] = useState<'CPF' | 'CNPJ' |  'PHONE' |  'EMAIL' | 'RANDOM'>('CPF')
    
    const type = formState.account.keyType as string
   
    const { handleSubmit, register, formState: {errors} } = useForm<PixAccountType>({
        resolver: zodResolver(PixAccountSchema),
        defaultValues: { key: '', keyType: 'CPF' },
    })

    // async function postData(formData: FormData) {
    //     console.log('ADd accout forma dadta:', JSON.stringify(formData))

    // }

    const onSubmit: SubmitHandler<PixAccountType> = async (data: PixAccountType) => {
        
        data.keyType = pixType 

        const parsed_data = PixAccountSchema.safeParse(data)

        if (!parsed_data.success) {
            toast('Houston, we have a problem', {
                description: 'Please check the data you provided',
            })

            return 0
        }  
 
        const result = await createPixAccount({
            companyToken: '716a0432-de30-4d81-8b08-70f2366f5878',
            fiatAccountSchema: 'PIXAccount',
            data: {
                institutionName: "PIX Bank",
                accountName: parsed_data.data.accountName as string,
                fiatAccountType: "BankAccount",
                keyType: parsed_data.data.keyType as string,
                key: parsed_data.data.key as string,
            }})
 
        if (result.success) {
            toast('Pix account created successfully', {
                description: 'Pix account created successfully',
            })
            redirect('/dashboard/bank-accounts')
        }else{
            console.log('error', result.message)
            toast('Houston, we have a problem', {
                description: result.message,
            })
        } 
    }


    const masks = {
        'CPF': '999.999.999-99',
        'CNPJ': '99.999.999/9999-99',
        'PHONE': '(99) 9999-9999',
        'RANDOM': '********-****-****-****-************'
    }
     
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">  
            <div className="flex flex-col gap-y-2">
                <Label>
                    Type of PIX key
                </Label> 
                <div className='flex flex-row gap-x-2'>
                    <Button variant={pixType == 'CPF' ? 'default' : "outline"} onClick = {() => setPixType('CPF')} type = 'button' className='text-xs text-gray-500 rounded-md'>
                        CPF
                    </Button>
                    <Button variant={pixType == 'CNPJ' ? 'default' : "outline"} onClick = {() => setPixType('CNPJ')} type = 'button' className='text-xs text-gray-500 rounded-md'>
                        CNPJ
                    </Button>
                    <Button variant={pixType == 'EMAIL' ? 'default' : "outline"} onClick = {() => setPixType('EMAIL')} type = 'button' className='text-xs text-gray-500 rounded-md'>
                        Email
                    </Button>
                    <Button variant={pixType == 'PHONE' ? 'default' : "outline"} onClick = {() => setPixType('PHONE')} type = 'button' className='text-xs text-gray-500 rounded-md'>
                        Phone
                    </Button>
                    <Button variant={pixType == 'RANDOM' ? 'default' : "outline"} onClick = {() => setPixType('RANDOM')} type = 'button' className='text-xs text-gray-500 rounded-md'>
                        Random
                    </Button>
                </div>
            </div> 
            <div className='flex flex-col gap-y-2'>
                <Label>
                    {`Account name (Its a way to identify the account)`}
                </Label>  
                <Input placeholder = {'Account Name'} {...register('accountName')}/>  
                {errors.accountName && <ErrorMessage>{errors.accountName.message}</ErrorMessage>}
            </div>   
            <div className='flex flex-col gap-y-2'>
                <Label>
                    {`PIX key ${type !== '' ? `(${type})` : ''}`}
                </Label>  
                {pixType == 'CPF' && <InputMask mask="___.___.___-__"  replacement={{ _: /\d/ }} placeholder = {'999.999.999-99'} {...register('key')}/>}
                {pixType == 'CNPJ' && <InputMask mask="__.___.___/____-__" replacement={{ _: /\d/ }} placeholder = {'99.999.999/9999-99'} {...register('key')}/>}
                {pixType == 'EMAIL' && <Input type="email" placeholder = {'email@gmail.com'} {...register('key')}/>}
                {pixType == 'RANDOM' && <InputMask mask="********-****-****-****-************" replacement={{ '*': /[0-9a-fA-F]/ }} placeholder = {'(99) 99999-9999'} {...register('key')}/>}
                {pixType == 'PHONE' && <InputMask  mask="(__) _____-____"  replacement={{ _: /\d/ }}placeholder = {'000.000.000-00'} {...register('key')}/>}
                {errors.key && <ErrorMessage>{errors.key.message}</ErrorMessage>}
            </div>

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

const CommingSoon = () => {
 
    return (
        <>   
            <div className='h-40 rounded-xl bg-muted flex items-center justify-center'>
                <p className="text-xs text-gray-500">This account type is comming soon</p> 
            </div>  
        </>
    )
}