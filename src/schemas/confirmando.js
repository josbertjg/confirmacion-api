import z from "zod"
import { userSchema } from "./user.js";

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

export const inputConfirmandoSchema = userSchema.pick({
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

export function validateInputConfirmando(data) {
  return inputConfirmandoSchema.safeParseAsync(data);
}