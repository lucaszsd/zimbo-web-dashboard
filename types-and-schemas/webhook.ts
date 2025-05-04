import { z } from 'zod';

export const WebhookSchema = z.object({
    webhookUrl: z.string().trim().regex(/^(https?:\/\/)?[^\s$.?#].[^\s]*$/, 'Invalid URL'),
    events: z.array(z.string()).optional(),
    apiKey: z.string().optional(), 
    webhookSecret: z.string().optional(),
    webhookEnabled: z.boolean().optional(),
})

export type WebhookType = z.infer<typeof WebhookSchema>


