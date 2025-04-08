import z from "zod"
import { userSchema } from "./user";
import { grupoVidaSchema } from "./grupoVida";
import { confirmacionSchema } from "./confirmacion";

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
);

export type Confirmando = z.infer<typeof confirmandoSchema>;
export type PublicConfirmando = z.infer<typeof publicConfirmandoSchema>;
export type InputRegisterConfirmando = z.infer<typeof inputRegisterConfirmandoSchema>;

export function validateInputConfirmando(data: InputRegisterConfirmando) {
  return inputRegisterConfirmandoSchema.safeParseAsync(data);
}