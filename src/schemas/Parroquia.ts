import { z } from 'zod';

export const parroquiaSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().optional().nullable(),
  ubicacion: z.string().optional().nullable(),
  id_zona_pastoral: z.number().int().positive(),
});

export type Parroquia = z.infer<typeof parroquiaSchema>;