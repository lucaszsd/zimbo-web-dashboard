'use client'

import { getClientConfig } from "@/actions/get-client-config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/firebase.config"
import { Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "sonner"


export default function ApiKey() {

    const [ user ] =  useAuthState(auth)

    const [apiKey, setApiKey] = useState<string | null>('loading...')

    useEffect(() => {

        user?.getIdToken().then(async (token) => {
            const { success, data, message} = await getClientConfig({companyId: 'edb94301-097f-41c9-8a1e-e78138981a4f', firebaseToken: token })

            if(success){
                console.log(JSON.stringify(data)) 
                setApiKey(data?.apiKey)
                
            }else{
                toast.error('Houston, we have a problem', {
                    description: 'Please check the data you provided: ' + message, richColors: true,
                })
            }
        })


    }, [])


    const handleCopy = () => {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey)
            toast.success('API Key copied to clipboard', {
                description: 'You can now use it to authenticate your requests',
                richColors: true,
            })
        } else {
            toast.error('API Key not found', {
                description: 'Please try again later',
                richColors: true,
            })
        }
    }

  return (
    <div>
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>API Key</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">This is your API key. Use it to authenticate your requests.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row gap-x-2 items-center">
                <p>{apiKey}</p>
                <Button variant={'ghost'} onClick={handleCopy}>
                <Copy className="" />
                </Button>
            </CardContent>

        </Card>
    </div>
  )
}
