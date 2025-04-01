import { Connection } from "../config/connection"
import { Confirmacion } from "../schemas/confirmacion";
import { NotFoundError } from "../utils/errors";

export class ConfirmacionModel {
  static async getAll (): Promise<Confirmacion[]> {
    const confirmaciones = await Connection.query<Confirmacion[]>(`SELECT *, BIN_TO_UUID(id) as id FROM confirmaciones;`)
    return confirmaciones
  }

  static async getConfirmacionInscribiendoActual ({id_parroquia}: { id_parroquia: number }) {
    const confirmacion = await Connection.query<Confirmacion[]>(`SELECT *, BIN_TO_UUID(id) as id FROM confirmaciones WHERE 
      inscribiendo = 1 AND
      activo = 1 AND
      id_parroquia = ?;`, 
      [id_parroquia]
    )
    if(confirmacion.length === 0) throw new NotFoundError({message: "No hay confirmaciones activas en este momento o ya finalizaron las inscripciones para la confirmacion actual"})

    return confirmacion[0]
  }
}