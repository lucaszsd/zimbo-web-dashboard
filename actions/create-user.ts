type createUserType = { 
    companyId: string;
    name: string;
    email: string;
    uid: string;
    role: string;
}

export async function createUser({name, email, uid, role, companyId }: createUserType) {

    const data = {
        name,
        email,
        uid,
        role
    }

    const response = await fetch(`${process.env.ZIMBO_API_URL}/generate-key`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${companyId}`,
        },
        body: JSON.stringify(data)
    });

    console.log('Response => ', response);
    
    // if (!response.ok) {
    //     throw new Error("Failed to generate API key");
    // }
    
    // const data = await response.json();
    // return data;   
    return 0 
}

