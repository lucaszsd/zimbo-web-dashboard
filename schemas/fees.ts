import { z } from 'zod';

export const FeesSchema = z.object({ 
    id: z.string().uuid('Invalid fee ID').optional(),
    name: z.string().trim().min(1, 'Fee name is required').max(50, 'Fee name must be less than 50 characters'),
    address: z.string().trim().min(1, 'Address is required').regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid crypto wallet address'),
    payin_percentage_fee: z.number().min(0, 'Payin percentage must be greater than or equal to 0').max(1000, 'Payin percentage must be less than or equal to 1000'),
    payin_flat_fee: z.number().min(0, 'Payin fixed fee must be greater than or equal to 0').max(1000, 'Payin fixed fee must be less than or equal to 1000'),
    payout_percentage_fee: z.number().min(0, 'Payout percentage must be greater than or equal to 0').max(1000, 'Payout percentage must be less than or equal to 1000'),
    payout_flat_fee: z.number().min(0, 'Payout fixed fee must be greater than or equal to 0').max(1000, 'Payout fixed fee must be less than or equal to 1000'),
})

export type FeesType = z.infer<typeof FeesSchema>


