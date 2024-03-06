import { z } from 'zod';

import { Token, User } from '@/model';

/**
 * @description API Body
 */
export const LoginBodySchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type LoginBody = z.infer<typeof LoginBodySchema>;

export const RegisterBodySchema = z.object({
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});
export type RegisterBody = z.infer<typeof RegisterBodySchema>;

/**
 * @description API Response
 */
export type ProfileResponse = User;
export type TokenResponse = Token;
