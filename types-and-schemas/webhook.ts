import { z } from 'zod';

export const WebhookSchema = z.object({
    url: z.string().trim().regex(/^(https?:\/\/)?[^\s$.?#].[^\s]*$/, 'Invalid URL'),
    events: z.array(z.string()).optional(), 
})

export type WebhookType = z.infer<typeof WebhookSchema>


