import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string(),
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isActive: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;
