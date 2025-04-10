import { grupoVidaSchema } from "./grupoVida";
import { inputCreateUbicacionSchema } from "./ubicacion";
import { userSchema } from "./user";
import z from "zod"

export const catequistaSchema = z.object({
  id: z.string().uuid(),
  user_id: userSchema.shape.id,
});

export const inputRegisterCatequistaSchema = userSchema.pick({
  nombre: true,
  apellido: true,
  email: true,
  cedula: true,
  phone: true,
  born_date: true,
  id_parroquia: true
}).merge(inputCreateUbicacionSchema);

export const catequistaGruposVida = z.object({
  id: z.string().uuid(),
  id_grupo_vida: grupoVidaSchema.shape.id,
  id_catequista: catequistaSchema.shape.id,
})


export type Catequista = z.infer<typeof catequistaSchema>
export type InputRegisterCatequista = z.infer<typeof inputRegisterCatequistaSchema>
export type CatequistaGruposVida = z.infer<typeof catequistaGruposVida>

export function validateCatequistaRegister(data: InputRegisterCatequista) {
  return inputRegisterCatequistaSchema.safeParseAsync(data);
}