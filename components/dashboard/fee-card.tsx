'use client'
import { deleteFee } from "@/actions/delete-fee";
import { auth } from "@/firebase.config";
import copyToClipboard from "@/lib/copy-to-clipboard";
import { FeesType } from "@/types-and-schemas/fees";
import { ArrowDown, ArrowUp, Copy, Edit2, Trash2 } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";

export default function FeeCard({id, name, address, payin_percentage_fee, payin_flat_fee, payout_percentage_fee, payout_flat_fee}: FeesType) {

    const [user] = useAuthState(auth)

    const deleteFeeAction = async () => { 
        user?.getIdToken().then(async (token) => {
            const { success, message } = await deleteFee({
                id: id as string,
                companyId: 'edb94301-097f-41c9-8a1e-e78138981a4f',
                firebaseToken: token,
            })  
            if(success){ 
                toast.success('Fee deleted successfully')
            } else{ 
                toast.error('Houston, we have a problem', {
                    description: 'We had problem deleting this fee, try again later: ' + message,
                })
            }
        })
        
    }
   


  return (
    <Card className="w-full gap-2">
        <CardHeader className="flex flex-row justify-between ">
            <div className="flex flex-col ">
                <p className="text-sm  font-semibold">{name}</p>
                <div className="flex flex-row items-center">
                        <p className="text-gray-500 text-xs">id: {id}</p>
                        <Button size = {'icon'} onClick={() => copyToClipboard(id as string)} variant="link" className="text-xs text-gray-500">
                            <Copy />
                        </Button>
                </div>
            </div>
            <div className="flex flex-row gap-x-"> 
                <Button size={'icon'} className="" variant="ghost">
                    <Edit2 className="" />
                </Button> 
                <Button size={'icon'} onClick = {deleteFeeAction} variant="ghost" >
                    <Trash2 className="" />
                </Button>
            </div>  
        </CardHeader>
        <CardFooter className="flex flex-row  justify-between items-center">
            <div className="flex flex-row gap-x-4">
                <div className="flex flex-col bg-muted p-2 rounded">
                    <div className="flex flex-row items-center gap-x-1">
                    <p className="text-xs text-green-800">Payin fee</p>
                    <ArrowDown className="text-green-800 size-4" />
                    </div>
                    <p className="text-sm font-semibold">{`${payin_percentage_fee/100}% + ${payin_flat_fee/100}`}</p>
                </div>
                <div className="flex flex-col p-2 rounded bg-muted">
                    <div className="flex flex-row items-center gap-x-1">
                        <p className="text-xs text-red-800">Payout fee</p>
                        <ArrowUp className="text-red-800 size-4" />
                    </div>
                    <p className="text-sm font-semibold">{`${payout_percentage_fee/100}% + ${payout_flat_fee/100}`}</p>
                </div>
            </div>
                
                <div className="flex flex-row items-center gap-x-1">
                    <p className="text-xs">{'Wallet: ' + address.slice(0, 5) + ' ... ' + address.slice(-4)}</p>
                    <Button size={'icon'} onClick={() => copyToClipboard(address as string)} variant="link" className="text-xs text-gray-500">
                        <Copy className="text-xs text-gray-500" />
                    </Button>
                </div>
           
             
        </CardFooter>
    </Card>
  )
}
