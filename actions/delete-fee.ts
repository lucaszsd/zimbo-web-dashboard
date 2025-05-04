import { ServerResponseType } from "@/schemas/server-response";

type webhookConfigType = {
    companyId: string;
    firebaseToken: string; 
}

type deleteFee = webhookConfigType & {
    id: string;
}

export async function deleteFee({id, companyId, firebaseToken}: deleteFee): Promise<ServerResponseType> {
    
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
        data = await fetch(`${process.env.NEXT_PUBLIC_ZIMBO_API_URL}/dash/fee/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${firebaseToken}`, 
                companyId: companyId,
            }, 
        });
        console.log('Delete fee response', JSON.stringify(data), data.status)
        
        return {
            success: true,
            data: JSON.stringify(data),
            message: "Fee deleted successfully",
        } 
    }catch (error) {
        return {
            success: false,
            message: JSON.stringify(error),
        };
    }

   
 
   
}

