import z from "zod"
import { userSchema } from "./user";

export const confirmandoSchema = z.object({
  id: z.string().uuid(),
  inscrito: z.boolean().default(false),
  primera_comunion: z.boolean(),
  activo: z.boolean().default(true),
  created_at: z.string().date(),
  updated_at: z.string().date(),
  grupoVida_id: z.string().uuid(),
  user_id: z.string().uuid(),
  id_confirmacion: z.string().uuid(),
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