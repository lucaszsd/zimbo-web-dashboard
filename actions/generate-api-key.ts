import { ServerResponseType } from "@/types-and-schemas/server-response";

 

type generateApiKeyType = {
    companyId: string;
    firebaseToken: string;
    webhookUrl: string;
}

export async function generateApiKey({companyId, firebaseToken, webhookUrl}: generateApiKeyType): Promise<ServerResponseType> {

    if (!firebaseToken) {
        return {
            success: false,
            message: "User is not authenticated",
        }
    } 

    if (!companyId) {
        return{
            success: false,
            message: "Company not found",
        }
    }

    let data = null 
    try{
        data = await fetch(`${process.env.NEXT_PUBLIC_ZIMBO_API_URL}/dash/client/apiKey`, {
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
            message: "API key generated successfully",
        }

    }catch (error) {
        console.error("Error generating API key", error);
        return {
            success: false,
            message: "Failed to generate API key",
        };
    }


}

