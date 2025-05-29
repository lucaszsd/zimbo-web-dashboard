'use client'
import { webhookConfig } from "@/actions/webhook-config";
import SaveButton from "@/components/save-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase.config";
import { WebhookSchema, WebhookType } from "@/types-and-schemas/webhook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


export default function Form() {
    
    const [user] = useAuthState(auth)

     
    
    const { handleSubmit, register, formState: {errors} } = useForm<WebhookType>({
        resolver: zodResolver(WebhookSchema),
        defaultValues: { webhookUrl: '', events: []},
    })
    
    const onSubmit: SubmitHandler<WebhookType> = async (data: WebhookType) => {
        
        const parsedData = WebhookSchema.safeParse(data)

        if (!parsedData.success) {
            toast('Houston, we have a problem', {
                description: 'Please check the data you provided',
            })
        } 
 
        user?.getIdToken().then(async (token) => {
            const result = await webhookConfig({companyId: 'edb94301-097f-41c9-8a1e-e78138981a4f', firebaseToken: token, webhookUrl: parsedData.data?.webhookUrl as string })
            
            if(result.success){
                toast.success('Webhook created successfully', {
                    description: 'You can now use this webhook to observe events' + result.message,
                }) 
 
            }else{
                toast.error('Houston, we have a problem', {
                    description: 'Please check the data you provided' + result.message,
                })
            }
        })

        
           
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} > 
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create webhook</CardTitle>
                <CardDescription>Create a webhook to observe all eventes</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-y-5'> 
                <div className='flex flex-col gap-y-2 '>
                    <Label>
                        Targeted URL
                    </Label> 
                    <Input placeholder = {'https://www.google.com/webhook'} {...register('webhookUrl')} /> 
                    {errors.webhookUrl && <p className="">{errors.webhookUrl.message}</p>}
                </div> 
            </CardContent>
            <CardFooter className="flex justify-end">
                {/* <Button variant="outline" className="w-full">
                    Create Webhook
                </Button> */}
                <SaveButton >
                    Save Webhook
                </SaveButton>
            </CardFooter>
        </Card>
    </form>
  )
}
