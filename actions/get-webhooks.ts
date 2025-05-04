import { ServerResponseType } from "@/types-and-schemas/server-response";

type webhookConfigType = {
    companyId: string;
    firebaseToken: string; 
}

export async function getWebhooks({companyId, firebaseToken}: webhookConfigType): Promise<ServerResponseType> {

    if (!firebaseToken) {
        throw new Error("User is not authenticated");
    } 

    if (!companyId) {
        throw new Error("Company ID is required");
    }

    let data = null 
    try{
        data = await fetch(`${process.env.NEXT_PUBLIC_ZIMBO_API_URL}/dash/client/webhook`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${firebaseToken}`, 
                companyId: companyId,
            },
        });

        return {
            success: true,
            data: await data.json(),
            message: "Webhooks fetched successfully",
        }

    }catch (error) {
        console.error("Error fetching Webhooks", error);
        return {
            success: false,
            message: "Failed to fetch Webhooks",
        };
    }

   
 
   
}

