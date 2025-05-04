import { ServerResponseType } from "@/types-and-schemas/server-response";

type webhookConfigType = {
    companyId: string;
    firebaseToken: string; 
}
  
export async function getFees({companyId, firebaseToken}: webhookConfigType): Promise<ServerResponseType> {

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
            message: "Fee retrieved successfully",
        }

    }catch (error) {
        console.error("Error searching fees", error);
        return {
            success: false,
            message: "Error searching fees",
        };
    }

   
 
   
}

