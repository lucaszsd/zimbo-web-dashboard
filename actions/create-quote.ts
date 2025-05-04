

import { ServerResponseType } from "@/types-and-schemas/server-response";

type apiKeyType = {
    companyToken: string;
}

type createQuote = apiKeyType & {
    fiatType: string;
    cryptoType: string;
    address: string;
    country: string;
    fiatAmount: number;
}

export async function createQuote({fiatType, cryptoType,  fiatAmount, address, country,  companyToken}: createQuote): Promise<ServerResponseType> {

    if (!companyToken) {
        return {
            success: false,
            message: "Company token is required",
        }
    } 
 
    let data = null 
    try{
        data = await fetch(`${process.env.NEXT_PUBLIC_ZIMBO_API_URL}/quote/out`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${companyToken}`,
            },
            body: JSON.stringify({
                fiatType: fiatType,
                cryptoType: cryptoType,
                address: address,
                country: country,
                fiatAmount: fiatAmount,
            })
        });

        console.log("data", data);
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

