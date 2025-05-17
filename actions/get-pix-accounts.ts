

import { ServerResponseType } from "@/types-and-schemas/server-response";
 
export async function getPixAccount({ companyToken }: {companyToken: string}): Promise<ServerResponseType> {

    if (!companyToken) {
        return {
            success: false,
            message: "Company token is required",
        }
    } 
 
    let result = null 
    try{
        result = await fetch(`${process.env.NEXT_PUBLIC_ZIMBO_API_URL}/accounts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${companyToken}`,
            }, 
        });
 
        return {
            success: true,
            data: await result.json(),
            message: "Pix account saved successfully",
        }

    }catch (error) {
        return {
            success: false,
            message: JSON.stringify(error),
        };
    }


}

