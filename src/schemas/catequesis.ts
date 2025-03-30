import { z } from 'zod';

export const catequesisSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(500),
  fecha: z.date(),
  hora_inicio: z.string().time(),
  hora_fin: z.string().time(),
  descripcion_catequistas: z.string().optional().nullable(),
  descripcion: z.string().optional().nullable(),
  flayer: z.string().optional().nullable(),
  type: z.enum(['PLENARIA', 'GRUPOS_VIDA', 'MIXTA', 'ESPECIAL']).default('PLENARIA'),
  id_confirmacion: z.string().uuid(),
  created_at: z.string().date().or(z.date()),
  updated_at: z.string().date().or(z.date()),
});

export type Catequesis = z.infer<typeof catequesisSchema>;
export type CatequesisType = "PLENARIA" | "GRUPOS_VIDA" | "MIXTA" | "ESPECIAL";