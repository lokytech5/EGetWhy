import { z } from 'zod';

export const registerSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    username: z.string().min(5, 'Username must be at least 5 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type FormData = z.infer<typeof registerSchema>;

export const verificationSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    code: z.string().min(6, { message: 'Verification code must be at least 6 characters' }),
})

export type VerificationData = z.infer<typeof verificationSchema>;

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type LoginFormData = z.infer<typeof loginSchema>;