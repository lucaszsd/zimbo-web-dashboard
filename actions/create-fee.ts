import { FeesType } from "@/types-and-schemas/fees";
import { ServerResponseType } from "@/types-and-schemas/server-response";

type webhookConfigType = {
    companyId: string;
    firebaseToken: string; 
}

type createFeeType = webhookConfigType & FeesType

export async function createFee({address, name, payin_percentage_fee, payin_flat_fee, payout_percentage_fee, payout_flat_fee, companyId, firebaseToken}: createFeeType): Promise<ServerResponseType> {

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
                name,
                address,
                payin_percentage_fee,
                payin_flat_fee, 
                payout_percentage_fee, 
                payout_flat_fee,
            }),
        });

        if (!data.ok) {
            const errorData = await data.json();
            JSON.stringify('Teste', errorData);
            return {
                success: false,
                message: errorData.error || "Failed to create fee",
            };
        }
        
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

