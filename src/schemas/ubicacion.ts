import { z } from "zod";

export const ubicacionSchema = z.object({
  id: z.number().int().positive(),
  address: z.string().optional(),
  latitud: z.string().max(255).optional(),
  longitude: z.string().max(255).optional(),
  created_at: z.string().date().or(z.date()),
  updated_at: z.string().date().or(z.date()),
});

export type Ubicacion = z.infer<typeof ubicacionSchema>;