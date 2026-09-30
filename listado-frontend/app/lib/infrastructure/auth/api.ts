import { apiClient } from '../api/client';
import { zod_string } from '~/lib/shared/types';
import z from 'zod';

export const AuthResponseSchema = z.object({
  accessToken: zod_string,
  authData: z.record(zod_string, z.any()),
  expiresIn: z.number(),
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export async function performLogin(
  formData: Record<string, any>
): Promise<AuthResponse> {
  try {
    const result = await apiClient.post<AuthResponse>('/auth/login', formData);
    return result;
  } catch (error) {
    console.error('Error login user:', error);
    throw error;
  }
}
