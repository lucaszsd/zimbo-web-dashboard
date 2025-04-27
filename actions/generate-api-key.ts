
type generateApiKeyType = {
    companyId: string;
    firebaseToken: string;
}

export async function generateApiKey({companyId, firebaseToken}: generateApiKeyType) {
 
  
    if (!firebaseToken) {
        // throw new Error("User is not authenticated");
        // console.log('User is not authenticated');
    }else {
        console.log('Token => ', firebaseToken);
    }
 
    await fetch(`${process.env.NEXT_PUBLIC_ZIMBO_API_URL}/dash/client/apiKey`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${firebaseToken}`, 
        companyId: companyId,
        },
    });

    // console.log('Response => ', response);
    
    // if (!response.ok) {
    //     throw new Error("Failed to generate API key");
    // }
    
    // const data = await response.json();
    // return data;   
    return 0 
}

