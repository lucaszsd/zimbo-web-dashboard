import { FeesType } from "@/schemas/fees";
import { ServerResponseType } from "@/schemas/server-response";

type webhookConfigType = {
    companyId: string;
    firebaseToken: string; 
}

type createFeeType = webhookConfigType & FeesType

export async function createFee({address, name, payinpercentage, payinfixed, payoutpercentage, payoutfixed, companyId, firebaseToken}: createFeeType): Promise<ServerResponseType> {

    if (!firebaseToken) {
        return {
            success: false,
            message: "User is not authenticated",
        }
    } 

    if (!companyId) {
        return {
            success: false,
            message: "Company ID is required",
        }
    }

    let data = null 
    try{
        data = await fetch(`${process.env.NEXT_PUBLIC_ZIMBO_API_URL}/dash/fee`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${firebaseToken}`, 
                companyId: companyId,
            },
            body: JSON.stringify({
                name: name,
                address: address, //TODO: add a real address
                payin_percentage_fee: payinpercentage,
                payin_flat_fee: payinfixed,
                payout_percentage_fee: payoutpercentage,
                payout_flat_fee: payoutfixed,
            }),
        });

        return {
            success: true,
            data: await data.json(),
            message: "Fee created successfully",
        }

    }catch (error) {
        console.error("Error creating fee", error);
        return {
            success: false,
            message: "Error creating fee",
        };
    }

   
 
   
}

