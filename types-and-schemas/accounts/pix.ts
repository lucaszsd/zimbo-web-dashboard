import { z } from 'zod';

export const PixAccountSchema = z.object({
    key: z.string().min(1, { message: 'Pix key is required' }).max(100, { message: 'Key must be less than 100 characters' }),
    keyType: z.enum(['CPF', 'CNPJ', 'EMAIL', 'PHONE', 'RANDOM'], {
        errorMap: () => ({ message: 'Invalid key type' }),
    }).optional(),
    fiatAccountType: z.string().min(1, { message: 'Fiat account type is required' }).optional(),
    accountName: z.string().min(1, { message: 'Account name is required' }).optional(),
    institutionName: z.string().min(1, { message: 'Institution name is required' }).optional(),
})

export type PixAccountType = z.infer<typeof PixAccountSchema>


