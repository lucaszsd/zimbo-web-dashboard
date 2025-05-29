'use client'
import { getClientConfig } from "@/actions/get-client-config"
import WebhookCard from "@/components/dashboard/webhook-card"
import { auth } from "@/firebase.config"
import { WebhookType } from "@/types-and-schemas/webhook"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "sonner"

export default function WebhookList() {
 
    const [ webhooks, setWebhooks ] = useState<WebhookType | null>(null)
    
    const [user] = useAuthState(auth)
    useEffect (() => { 
      user?.getIdToken().then(async (token) => {
          const {success, data, message} = await getClientConfig({companyId: 'edb94301-097f-41c9-8a1e-e78138981a4f', firebaseToken: token })
          if(success){
            setWebhooks(data as WebhookType)
          }else{
            toast.error('Houston, we have a problem', {
                description: 'Please check the data you provided: ' + message, richColors: true,
            })
          }
      }) 
    }, [user])
    


  return (
    <div className="w-full min-h-10"> 
      {
        webhooks !== null ? (
          <WebhookCard webhookUrl={webhooks?.webhookUrl} webhookSecret={webhooks?.webhookSecret}  events = {['pix.created', 'pix.deleted', 'pix.success', 'pix.failure']}/>
        ) : 
        <div className="mt-5 text-center w-full h-40 border-dashed border-black rounded-lg flex items-center justify-center">
          <p>Create your first webhook</p>
        </div>
      }
    </div>
  )
}
