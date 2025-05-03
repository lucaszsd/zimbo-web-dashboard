'use client'
import { getClientConfig } from "@/actions/get-client-config"
import WebhookCard from "@/components/dashboard/webhook-card"
import { auth } from "@/firebase.config"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "sonner"

export default function WebhookList() {


      const [ webhooks, setWebhooks ] = useState([])
    
      const [user] = useAuthState(auth)
      useEffect (() => {
        
        user?.getIdToken().then(async (token) => {
            // console.log('Token firebase list', token)
            const response = await getClientConfig({companyId: 'edb94301-097f-41c9-8a1e-e78138981a4f', firebaseToken: token })

            if(response.success){ 
                toast.success('Webhooks fetched successfully')
            }else{
                toast.error('Houston, we have a problem', {
                    description: 'Please check the data you provided' + response.message,
                })
            }
        }) 
      })
    


  return (
    <div className="w-full bg-red-50 min-h-10">
        {webhooks.map((webhook) => (
          <WebhookCard key={webhook} url="https://www.myfintech.com/api/webhook"   events = {['pix.created', 'pix.deleted', 'pix.success', 'pix.failure']}/>
        ))}
        <WebhookCard key={''} url="https://www.myfintech.com/api/webhook"   events = {['pix.created', 'pix.deleted', 'pix.success', 'pix.failure']}/>
    </div>
  )
}
