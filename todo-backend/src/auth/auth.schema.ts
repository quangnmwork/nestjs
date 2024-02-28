import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type registerDto = z.infer<typeof registerSchema>;
export type loginDto = z.infer<typeof loginSchema>;
