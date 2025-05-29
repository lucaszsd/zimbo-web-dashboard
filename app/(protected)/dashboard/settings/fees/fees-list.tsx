'use client'
import { getFees } from "@/actions/get-fees";
import FeeCard from "@/components/dashboard/fee-card";
import { auth } from "@/firebase.config";
import { FeesType } from "@/types-and-schemas/fees";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function FeesList() {

    const [ fees, setFees ] = useState<FeesType[] | []>([]);

    const [ user ] = useAuthState(auth);

    useEffect(() => {

        user?.getIdToken().then(async (token) => {
            const {data, success, message} = await getFees({
                companyId: 'edb94301-097f-41c9-8a1e-e78138981a4f',
                firebaseToken: token,
            })

            if(success){
                console.log('Fees list', data)
                setFees(data as FeesType[])
            }else{
                console.error('Error fetching fees: ', message)
            }
        })


    })
  return (
    <div className="gap-6 flex flex-col">
        {fees.toReversed().map((fee) => (
            <FeeCard key={fee.id} {...fee}   />
        ))}
    </div>
  )
}
