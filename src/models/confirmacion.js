import { Connection } from "../config/connection.js"

export class ConfirmacionModel extends Connection {
  constructor() {
    super(); // Llama al constructor de la clase padre (Connection)
  }

  async getAll () {
    const confirmaciones = await this.db.query(`SELECT *, BIN_TO_UUID(id) as id FROM confirmaciones;`)
    return confirmaciones
  }

  async create () {

  }

  async getConfirmacionActual ({id_parroquia}) {
    const [confirmacion] = await this.db.query(`SELECT *, BIN_TO_UUID(id) as id FROM confirmaciones WHERE 
      inscribiendo = 1 AND
      activo = 1 AND
      id_parroquia = ?;`, 
      [id_parroquia]
    )
    if(confirmacion.length === 0) return {error: "No hay confirmaciones activas en este momento o ya finalizaron las inscripciones para la confirmacion actual"}

    return confirmacion[0]
  }

}