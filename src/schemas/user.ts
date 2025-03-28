import z from "zod"

export const userSchema = z.object({
  id: z.string().uuid(),
  nombre: z.string().min(1).max(255),
  apellido: z.string().min(1).max(255),
  email: z.string().email().max(255),
  password: z.string().min(8).max(255),
  picture: z.string().url().optional().nullable(),
  cedula: z.string().min(6).max(11).regex(/^[a-zA-Z]\d{5,10}$/),
  phone: z.string().min(8).max(30),
  role: z.enum(['ADMIN', 'CATEQUISTA', 'CONFIRMANDO', 'COORDINADOR', 'AUXILIAR']),
  born_date: z.string().date().or(z.date()),
  created_at: z.string().date().or(z.date()),
  updated_at: z.string().date().or(z.date()),
  id_ubicacion: z.number().optional().nullable(),
  id_parroquia: z.number().int(),
});
export const publicUserSchema = userSchema.omit({password: true})

export type User = z.infer<typeof userSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;

export function returnPublicUsers(users: User | User[]) {
  if(Array.isArray(users)) return users.map(user => publicUserSchema.parse(user))
  else return publicUserSchema.parse(users)
}