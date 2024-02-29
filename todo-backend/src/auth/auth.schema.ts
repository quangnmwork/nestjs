import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const registerSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const tokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const profileSchema = z.object({
  email: z.string(),
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isActive: z.boolean(),
});

export class profileDto extends createZodDto(profileSchema) {}

export class registerDto extends createZodDto(registerSchema) {}

export class loginDto extends createZodDto(loginSchema) {}

export class tokenDto extends createZodDto(tokenSchema) {}
