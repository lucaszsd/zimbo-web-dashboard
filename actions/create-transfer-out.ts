

import { ServerResponseType } from "@/types-and-schemas/server-response";

type apiKeyType = {
    companyToken: string;
}

type createTransfer = apiKeyType & {
    quoteId: string;
    fiatAccountId: string;
    sourceAddress: string;
     
}

export async function createQuote({quoteId, fiatAccountId,  sourceAddress, companyToken }: createTransfer): Promise<ServerResponseType> {

    if (!companyToken) {
        return {
            success: false,
            message: "Company token is required",
        }
    } 
 
    let data = null 
    try{
        data = await fetch(`${process.env.NEXT_PUBLIC_ZIMBO_API_URL}/transfer/out`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${companyToken}`,
            },
            body: JSON.stringify({
                quoteId: quoteId,
                fiatAccountId: fiatAccountId,
                sourceAddress: sourceAddress,
            })
        });

        // console.log("data", data);
        return {
            success: true,
            data: await data.json(),
            message: "Quote generated successfully",
        }

    }catch (error) {
        return {
            success: false,
            message: JSON.stringify(error),
        };
    }


}

