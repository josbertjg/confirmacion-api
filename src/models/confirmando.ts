import { Connection } from "../config/connection"
import bcrypt from "bcrypt"
import { Confirmando } from "../schemas/confirmando";
import { NotFoundError, ValidationError } from "../utils/errors";
export class ConfirmandoModel {
  static async getAll (): Promise<Confirmando[]> {
    const confirmandos = await Connection.query<Confirmando[]>(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(id_confirmacion) as id_confirmacion, BIN_TO_UUID(user_id) as user_id FROM confirmandos;`)
    return confirmandos
  }

  static async getById ({id}: {id: string}): Promise<Confirmando> {
    const [confirmando] = await Connection.query<Confirmando[]>(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(id_confirmacion) as id_confirmacion, BIN_TO_UUID(user_id) as user_id FROM confirmandos WHERE id = UUID_TO_BIN(?);`, [id])
    return confirmando;
  }

  static async getByUserId ({id}: {id: string}): Promise<Confirmando> {
    const [confirmando] = await Connection.query<Confirmando[]>(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(id_confirmacion) as id_confirmacion, BIN_TO_UUID(user_id) as user_id FROM confirmandos WHERE user_id = UUID_TO_BIN(?);`, [id])
    return confirmando;
  }

  static async inscribir ({id_confirmando}: {id_confirmando: string}) {
    const confirmandoInscrito = await Connection.query(`
      SELECT c.inscrito, u.nombre, u.apellido, u.cedula, BIN_TO_UUID(u.id) as user_id
      FROM confirmandos c
      INNER JOIN users u ON c.user_id = u.id
      WHERE c.id = UUID_TO_BIN(?);`, [id_confirmando])

    if(confirmandoInscrito.length === 0) throw new NotFoundError({message: "Confirmando no encontrado"})

    const confirmando = confirmandoInscrito[0]
    if(confirmando.inscrito) throw new ValidationError({message: `El confirmando ${confirmando.nombre} ${confirmando.apellido} de cedula: ${confirmando.cedula} ya se encuentra inscrito`})

    await Connection.query(`UPDATE confirmandos SET inscrito = 1 WHERE id = UUID_TO_BIN(?);`, [id_confirmando])

    confirmando.inscrito = true;

    const cedulaSinChar = Array.from(confirmando.cedula).slice(1).join('')
    const hashedPassword = await bcrypt.hash(cedulaSinChar, 10);
    await Connection.query(`UPDATE users SET password = ? WHERE id = UUID_TO_BIN(?);`, [hashedPassword, confirmando.user_id])

    return { message: "Confirmando inscrito exitosamente", confirmando: confirmando};
  }
}