import { userSchema } from "./user";
import z from "zod"

export const inputRegisterCatequistaSchema = userSchema.pick({
  nombre: true,
  apellido: true,
  email: true,
  cedula: true,
  phone: true,
  born_date: true,
  id_parroquia: true
})

export type InputRegisterCatequista = z.infer<typeof inputRegisterCatequistaSchema>

export function validateCatequistaRegister(data: InputRegisterCatequista) {
  return inputRegisterCatequistaSchema.safeParseAsync(data);
}