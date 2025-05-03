import { ServerResponseType } from "@/schemas/server-response";

type clientConfigType = {
    companyId: string;
    firebaseToken: string; 
}

export async function getClientConfig({companyId, firebaseToken}: clientConfigType): Promise<ServerResponseType> {

    if (!firebaseToken) {
        throw new Error("User is not authenticated");
    } 

    if (!companyId) {
        throw new Error("Company ID is required");
    }

    let data = null 
    try{
        data = await fetch(`${process.env.NEXT_PUBLIC_ZIMBO_API_URL}/dash/client`, {
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
            message: "Configuration fetched successfully",
        }

    }catch (error) {
        console.error("Error retrieving configs", error);
        return {
            success: false,
            message: "Error retrieving configs",
        };
    }

   
 
   
}

