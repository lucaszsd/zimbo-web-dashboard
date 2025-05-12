'use client'

import { generateApiKey } from "@/actions/generate-api-key"
import { getClientConfig } from "@/actions/get-client-config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/firebase.config"
import { Copy, RefreshCcw } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "sonner"


export default function ApiKey() {

    const [ user ] =  useAuthState(auth)

    const [apiKey, setApiKey] = useState<string | null>('loading...')
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')

    useEffect(() => {

        user?.getIdToken().then(async (token) => {
            const { success, data, message} = await getClientConfig({companyId: 'edb94301-097f-41c9-8a1e-e78138981a4f', firebaseToken: token })

            if(success){ 
                setStatus('success') 
                setApiKey(data?.apiKey as string)
            }else{
                setStatus('error')
                toast.error('Houston, we have a problem', {
                    description: 'Please check the data you provided: ' + message, richColors: true,
                })
            }
        })  
    }, [user])


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

    const handleRegenerateKey = () => { 
        setStatus('loading')
        
        user?.getIdToken().then(async (token) => {

            const { success, data, message} = await generateApiKey({companyId: 'edb94301-097f-41c9-8a1e-e78138981a4f', firebaseToken: token, webhookUrl: ''})

            if(success){ 
                setStatus('success') 
                setApiKey(data?.apiKey as string)
                toast.success('API Key generated successfully', {
                    description: 'You can now use it to authenticate your requests with the new key',
                    richColors: true,
                })
            }else{
                setStatus('error')
                toast.error('Houston, we have a problem', {
                    description: 'Please check the data you provided: ' + message, richColors: true,
                })
            }
            
        })   
    }

  return (
    <div>
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="flex flex-row w-full justify-between">
                <div className="gap-y-2 flex flex-col">
                    <CardTitle>API Key</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">This is your API key. Use it to authenticate your requests.</CardDescription>
                </div> 
                <Button variant={'ghost'} onClick={() => handleRegenerateKey()} className="group">
                    <RefreshCcw className="group-hover:-rotate-180 duration-500" />
                </Button>
            </CardHeader>
            <CardContent className="flex flex-row gap-x-2 items-center">
                <p>
                    {status === 'loading' ? 'Loading...' : status === 'error' ? 'Error loading API Key' : apiKey}
                </p>
                <Button disabled = {status !== 'success'} variant={'ghost'} onClick={handleCopy}>
                    <Copy className="" />
                </Button>
            </CardContent>

        </Card>

    </div>
  )
}
