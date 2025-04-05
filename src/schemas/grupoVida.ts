import { z } from "zod";
import { confirmacionSchema } from "./confirmacion";

export const grupoVidaSchema = z.object({
  id: z.string().uuid(),
  nombre: z.string().min(1).max(255),
  id_confirmacion: confirmacionSchema.pick({id: true}),
  created_at: z.string().date().or(z.date()),
  updated_at: z.string().date().or(z.date()),
})

export type GrupoVida = z.infer<typeof grupoVidaSchema>