'use client'
import { createFee } from "@/actions/create-fee";
import SaveButton from "@/components/save-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase.config";
import { FeesSchema, FeesType } from "@/schemas/fees";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


export default function Form() {
    
    const [user] = useAuthState(auth)

     
    
    const { handleSubmit, register, formState: {errors} } = useForm<FeesType>({
        resolver: zodResolver(FeesSchema),
        defaultValues: { },
    })
    
    const onSubmit: SubmitHandler<FeesType> = async (data: FeesType) => {
        
    
        const parsedData = FeesSchema.safeParse(data)

        if (!parsedData.success) {
            toast('Houston, we have a problem', {
                description: 'Please check the data you provided',
            })
            return 
        }else{
            console.log('Parsed data', parsedData.data)
        }
  
        user?.getIdToken().then(async (token) => {
            const result = await createFee({
                companyId: 'edb94301-097f-41c9-8a1e-e78138981a4f', 
                firebaseToken: token, 
                name: parsedData.data.name,
                address: parsedData.data.address,
                payin_percentage_fee: parsedData.data.payin_percentage_fee,
                payin_flat_fee: parsedData.data.payin_flat_fee,
                payout_percentage_fee: parsedData.data.payout_percentage_fee,
                payout_flat_fee: parsedData.data.payout_flat_fee,
            })
            
            if(result.success){
                toast.success('Fee created successfully', {
                    description: 'You can now use this fees in new payins and payouts', 
                })
            }else{
                toast.error('Houston, we have a problem', {
                    description: 'We had problem creating this fee, try again later' + result.message,
                })
            }
        })

        
           
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} > 
    <Card className="w-full">
        <CardHeader>
            <CardTitle>Create fees</CardTitle>
            <CardDescription>Fees can be applied to payouts and payins</CardDescription>
        </CardHeader>
       <CardContent className='flex flex-col gap-y-5'> 
            <div className='flex flex-col gap-y-2 '>
                <Label>
                    Fee name 
                </Label> 
                <Input placeholder = {'Default fee'} {...register('name')} /> 
                {errors.name && <p className="">{errors.name.message}</p>}
            </div> 
             <div className='flex flex-col gap-y-2 '>
                <Label>
                    Crypto wallet address (EVM)
                </Label> 
                <Input placeholder = {'0x0BECD88f20F83916cb57A27EAbaEcCdd874cbA18'} {...register('address')} /> 
                {errors.address && <p className="">{errors.address.message}</p>}
            </div> 
            <div className="flex flex-row gap-x-5">
                <div className='flex flex-col gap-y-2 '>
                    <Label>
                        Payin percentage fee
                    </Label> 
                    <Input type="number" placeholder={'0.00'} {...register('payin_percentage_fee', { valueAsNumber: true})} /> 
                    {errors.payin_percentage_fee && <p className="">{errors.payin_percentage_fee.message}</p>}
                </div> 
                <div className='flex flex-col gap-y-2 '>
                    <Label>
                        Payin flat fee
                    </Label> 
                    <Input type="number" placeholder={'0.00'}{...register('payin_flat_fee', { valueAsNumber: true})} /> 
                    {errors.payin_flat_fee && <p className="">{errors.payin_flat_fee.message}</p>}
                </div> 
            </div>

            <div className="flex flex-row gap-x-5">
                <div className='flex flex-col gap-y-2 '>
                    <Label>
                        Payout percentage fee
                    </Label> 
                    <Input type="number" placeholder={'0.00'} {...register('payout_percentage_fee', { valueAsNumber: true})} /> 
                    {errors.payout_percentage_fee && <p className="">{errors.payout_percentage_fee.message}</p>}
                </div> 
                <div className='flex flex-col gap-y-2 '>
                    <Label>
                        Payout flat fee
                    </Label> 
                    <Input type="number" placeholder={'0.00'} {...register('payout_flat_fee', { valueAsNumber: true})} /> 
                    {errors.payout_flat_fee && <p className="">{errors.payout_flat_fee.message}</p>}
                </div> 
            </div>
        </CardContent>
        <CardFooter className="flex justify-end">
            {/* <CancelButton>
                Cancel
            </CancelButton> */}
            <SaveButton >
                Save Webhook
            </SaveButton>
        </CardFooter>
    </Card>
    </form>
  )
}
