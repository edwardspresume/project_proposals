import { z } from 'zod';

export const proposalInputSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .transform((str) => str.trim()),
    title: z
        .string()
        .min(3, { message: 'Title must be at least 3 characters long' })
        .max(100, { message: 'Title must be no longer than 100 characters' })
        .transform((str) => str.trim()),
    description: z
        .string()
        .min(10, { message: 'Description must be at least 10 characters long' })
        .max(1000, {
            message: 'Description must be no longer than 1000 characters',
        })
        .transform((str) => str.trim()),
});

export type proposalInput = z.infer<typeof proposalInputSchema>;
