import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Form() {


    const {
        handleSubmit,
        register,
        formState: { errors, },
        getValues,
        watch,
        setValue,
        control, 
    } = useForm<npsFormType>({
        resolver: zodResolver(npsFormSchema),
        defaultValues: {
            logo: logo,
            title: DEFAULT_TITLE,
            description: DEFAULT_DESCRIPTION,  
            color: DEFAULT_COLORS[3],
        }
    })
  return (
    <Card>
        <CardHeader>
            <CardTitle>Create webhook</CardTitle>
            <CardDescription>Create a webhook to observe all eventes</CardDescription>
        </CardHeader>
       <CardContent className='flex flex-col gap-y-5'>
                <div className='flex flex-col gap-y-2 '>
                    <Label>
                        Nome do formulário (Esse nome não será exibido para os clientes)
                    </Label>
                    {/* <Input required type='text' name = "cpf" placeholder='123.123.123-23'> */}
                        <Input   placeholder = {'Formulário natal 2024'} {...register('name')} /> 
                </div>  
        </CardContent>
        <CardFooter>
            <Button variant="outline" className="w-full">
                Create Webhook
            </Button>
            <Button variant="outline" className="w-full">
                Test Webhook
            </Button>
        </CardFooter>
    </Card>
  )
}
