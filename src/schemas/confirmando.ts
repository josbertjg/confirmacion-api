import z from "zod"
import { userSchema } from "./user";
import { grupoVidaSchema } from "./grupoVida";
import { confirmacionSchema } from "./confirmacion";
import { inputCreateUbicacionSchema } from "./ubicacion";

export const confirmandoSchema = z.object({
  id: z.string().uuid(),
  inscrito: z.preprocess((value) => value === 1 ? true : value === 0 ? false : value, z.boolean().default(false)),
  primera_comunion: z.preprocess((value) => value === 1 ? true : value === 0 ? false : value, z.boolean()),
  activo: z.preprocess((value) => value === 1 ? true : value === 0 ? false : value, z.boolean().default(true)),
  grupoVida_id: grupoVidaSchema.shape.id.optional().nullable(),
  user_id: userSchema.shape.id,
  id_confirmacion: confirmacionSchema.shape.id,
  created_at: z.string().date().or(z.date()),
  updated_at: z.string().date().or(z.date()),
});
export const publicConfirmandoSchema = confirmandoSchema.omit({user_id: true, id_confirmacion: true})

export const inputRegisterConfirmandoSchema = userSchema.pick({
  nombre: true,
  apellido: true,
  email: true,
  cedula: true,
  phone: true,
  born_date: true,
  id_parroquia: true,
}).merge(
  confirmandoSchema.pick({
    primera_comunion: true,
  })
).merge(inputCreateUbicacionSchema)

export const inputAdminEditConfirmandoSchema = inputRegisterConfirmandoSchema.omit({id_parroquia: true}).merge(userSchema.pick({picture: true}))
export const inputEditConfirmandoSchema = inputAdminEditConfirmandoSchema.omit({primera_comunion: true})

export type Confirmando = z.infer<typeof confirmandoSchema>;
export type PublicConfirmando = z.infer<typeof publicConfirmandoSchema>;
export type InputRegisterConfirmando = z.infer<typeof inputRegisterConfirmandoSchema>;
export type InputAdminEditConfirmando = z.infer<typeof inputAdminEditConfirmandoSchema>;
export type InputEditConfirmando = z.infer<typeof inputEditConfirmandoSchema>;

export function validateInputConfirmando(data: InputRegisterConfirmando) {
  return inputRegisterConfirmandoSchema.safeParseAsync(data);
}

export function validateEditPartialConfirmando(data: Partial<InputEditConfirmando>) {
  return inputEditConfirmandoSchema.partial().safeParseAsync(data);
}

export function validateAdminEditPartialConfirmando(data: Partial<InputAdminEditConfirmando>) {
  return inputAdminEditConfirmandoSchema.partial().safeParseAsync(data);
}