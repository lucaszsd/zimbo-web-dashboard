import { ServerResponseType } from "@/types-and-schemas/server-response";

type webhookConfigType = {
    companyId: string;
    firebaseToken: string;
    webhookUrl: string;
}

export async function webhookConfig({companyId, firebaseToken, webhookUrl}: webhookConfigType): Promise<ServerResponseType> {

    if (!firebaseToken) {
        throw new Error("User is not authenticated");
    } 

    if (!companyId) {
        throw new Error("Company ID is required");
    }

    let data = null 
    try{
        data = await fetch(`${process.env.NEXT_PUBLIC_ZIMBO_API_URL}/dash/client/webhook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${firebaseToken}`, 
                companyId: companyId,
            },
            body: JSON.stringify({
                webhookUrl: webhookUrl,
                webhookEnabled: true,
            })
        });

        return {
            success: true,
            data: await data.json(),
            message: "Webhook generated successfully",
        }

    }catch (error) {
        console.error("Error generating Webhook", error);
        return {
            success: false,
            message: "Failed to generate Webhook",
        };
    }

   
 
   
}

