import { z } from 'zod';

export const registerSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    username: z.string().min(5, 'Username must be at least 5 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type FormData = z.infer<typeof registerSchema>;