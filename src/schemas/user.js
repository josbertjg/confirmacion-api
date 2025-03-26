import z from "zod"

export const userSchema = z.object({
  id: z.string().uuid(),
  nombre: z.string().min(1).max(255),
  apellido: z.string().min(1).max(255),
  email: z.string().email().max(255),
  password: z.string().min(8).max(255),
  picture: z.string().url().optional(),
  cedula: z.string().min(7).max(10),
  phone: z.string().min(8).max(30),
  role: z.enum(['ADMIN', 'CATEQUISTA', 'CONFIRMANDO', 'COORDINADOR', 'AUXILIAR']),
  born_date: z.string().date(),
  created_at: z.string().date(),
  updated_at: z.string().date(),
  id_ubicacion: z.number().optional(),
  id_parroquia: z.number().int(),
});