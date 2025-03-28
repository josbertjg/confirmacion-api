import { userSchema } from "./user";
import z from "zod";

export const inputLoginSchema = userSchema.pick({email: true, password: true})
export type InputLogin = z.infer<typeof inputLoginSchema>

export function validateUserLogin(data: InputLogin) {
  return inputLoginSchema.safeParseAsync(data);
}