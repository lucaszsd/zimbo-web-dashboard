import { WebhookType } from '@/schemas/webhook'
import { Copy, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

export default function WebhookCard({url, events = []}: WebhookType) {
  return (
     <Card className="w-full mt-5">
        <CardHeader>
        <CardTitle>{url}</CardTitle>
        <CardDescription>
            {'events observed:'}
        </CardDescription>
        <div className='flex flex-row gap-x-2 flex-wrap'> 
            {events.map((event) => (
                <span key={event} className="text-sm text-green-900 bg-muted rounded-full px-3 py-1">
                    {event}
                </span>
            ))}
        </div>
        </CardHeader>
        <CardFooter className="flex justify-end">
        <Button>
            <Trash2 />
        Delete webhook</Button>
        <Button variant="outline" className="ml-2">
        <Copy />
            Copy secret
        </Button>
        </CardFooter>
    </Card> 
  )
}
