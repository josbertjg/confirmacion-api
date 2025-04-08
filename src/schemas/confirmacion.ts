import z from "zod";

export const confirmacionSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  fecha_inicio: z.string().date().or(z.date()).optional().nullable(),
  fecha_finalizado: z.string().date().or(z.date()).optional().nullable(),
  activo: z.preprocess((value) => value === 1 ? true : value === 0 ? false : value, z.boolean().default(false)),
  inscribiendo: z.preprocess((value) => value === 1 ? true : value === 0 ? false : value, z.boolean().default(true)),
  id_parroquia: z.number().int().positive(),
  created_at: z.string().date().or(z.date()).default(new Date()),
  updated_at: z.string().date().or(z.date()).default(new Date()),
});


export type Confirmacion = z.infer<typeof confirmacionSchema>