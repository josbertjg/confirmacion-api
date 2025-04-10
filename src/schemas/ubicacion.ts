import { z } from "zod";

export const ubicacionSchema = z.object({
  id: z.number().int().positive(),
  address: z.string(),
  latitude: z.string().max(255).optional().nullable().default(null),
  longitude: z.string().max(255).optional().nullable().default(null),
  created_at: z.string().date().or(z.date()),
  updated_at: z.string().date().or(z.date()),
});
export const inputCreateUbicacionSchema = ubicacionSchema.pick({address: true, latitude: true, longitude: true})
export const inputEditUbicacionSchema = inputCreateUbicacionSchema

export type Ubicacion = z.infer<typeof ubicacionSchema>;
export type InputCreateUbicacion = z.infer<typeof inputCreateUbicacionSchema>;
export type InputEditUbicacion = z.infer<typeof inputEditUbicacionSchema>;

export function validateUbicacion(input: any){
  return inputCreateUbicacionSchema.safeParseAsync(input);
}

export function validatePartialUbicacion(input: any) {
  return inputEditUbicacionSchema.partial().safeParseAsync(input);
}