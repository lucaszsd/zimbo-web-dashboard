import { boolean, z } from 'zod';

export const ServerResponseSchema = z.object({
    success: boolean(),
    data: z.object({}).optional(),
    message: z.string().optional(),
})

export type ServerResponseType = z.infer<typeof ServerResponseSchema>


