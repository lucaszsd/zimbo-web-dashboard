

import { ServerResponseType } from "@/types-and-schemas/server-response";

type apiKeyType = {
    companyToken: string;
}

type pixAccount = apiKeyType & {
    fiatAccountSchema: string;
    data: {
        institutionName: string;
        accountName: string;
        fiatAccountType: string;
        keyType: string;
        key: string; 
    }
}

export async function createPixAccount({fiatAccountSchema, data, companyToken}: pixAccount): Promise<ServerResponseType> {

    if (!companyToken) {
        return {
            success: false,
            message: "Company token is required",
        }
    } 
 
    let result = null 
    try{
        result = await fetch(`${process.env.NEXT_PUBLIC_ZIMBO_API_URL}/accounts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${companyToken}`,
            },
            body: JSON.stringify({
                fiatAccountSchema: fiatAccountSchema,
                data: {
                    institutionName: data.institutionName,
                    accountName: data.accountName,
                    fiatAccountType: data.fiatAccountType,
                    keyType: data.keyType,
                    key: data.key,
                }
            })
        });

        console.log("data", result);
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

