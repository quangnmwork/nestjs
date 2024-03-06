import { z } from 'zod';

export const TokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type Token = z.infer<typeof TokenSchema>;
