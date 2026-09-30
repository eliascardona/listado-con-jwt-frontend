import { z } from 'zod';
import { zod_string } from '../shared/types';

/*
  Login command
*/
const LoginCommandSchema = z.object({
  dn: zod_string,
  password: zod_string,
});
export type LoginCommand = z.infer<typeof LoginCommandSchema>;
