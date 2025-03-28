import { userSchema } from "./user";
export const inputLoginSchema = userSchema.pick({ email: true, password: true });
export function validateUserLogin(data) {
    return inputLoginSchema.safeParseAsync(data);
}
