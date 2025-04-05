import { z } from "zod";
import { catequistaSchema } from "./catequista";
import { confirmacionSchema } from "./confirmacion";
import { confirmandoSchema } from "./confirmando";
import { grupoVidaSchema } from "./grupoVida";
import { notificationSchema } from "./notification";
import { parroquiaSchema } from "./Parroquia";
import { ubicacionSchema } from "./ubicacion";
import { publicUserSchema } from "./user";

export const userMeScheme = publicUserSchema.merge(z.object({
  parroquia: parroquiaSchema,
  confirmando_info: confirmandoSchema.optional().nullable(),
  catequista_info: catequistaSchema.optional().nullable(),
  confirmacion: confirmacionSchema.optional().nullable(),
  grupos_vida: z.array(grupoVidaSchema).default([]),
  ubicacion: ubicacionSchema.optional().nullable(),
  notifications: z.array(notificationSchema).default([])
}))

export type UserMe = z.infer<typeof userMeScheme>

export function returnUserMe(users: UserMe) {
  return userMeScheme.parse(users)
}