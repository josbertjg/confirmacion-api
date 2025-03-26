import { userSchema } from "./user.js";

export const loginSchema = userSchema.pick({email: true, password: true})

export function validateUserLogin(data) {
  return loginSchema.safeParseAsync(data);
}