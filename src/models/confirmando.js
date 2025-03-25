import { Connection } from "../config/connection.js"

export class ConfirmandoModel extends Connection {
  constructor() {
    super(); // Llama al constructor de la clase padre (Connection)
  }

  async getAll () {
    const confirmandos = await this.db.query(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(id_confirmacion) as id_confirmacion, BIN_TO_UUID(user_id) as user_id FROM confirmandos;`)
    return confirmandos
  }

  async getById ({id}) {
    const [confirmando] = await this.db.query(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(id_confirmacion) as id_confirmacion, BIN_TO_UUID(user_id) as user_id FROM confirmandos WHERE id = UUID_TO_BIN(?);`, [id])
    return confirmando;
  }

  async inscribir ({id}) {
    const [isInscrito] = await this.db.query(`
      SELECT c.inscrito, u.nombre, u.apellido, u.cedula
      FROM confirmandos c
      INNER JOIN users u ON c.user_id = u.id
      WHERE c.id = UUID_TO_BIN(?);`, [id])

    const confirmandoInscrito = isInscrito[0]
    if(confirmandoInscrito.inscrito) return {error: `El confirmando ${confirmandoInscrito.nombre} ${confirmandoInscrito.apellido} de cedula: ${confirmandoInscrito.cedula} ya se encuentra inscrito`}

    await this.db.query(`UPDATE confirmandos SET inscrito = 1 WHERE id = UUID_TO_BIN(?);`, [id])
    const [confirmandoFormatted] = await this.db.query(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(id_confirmacion) as id_confirmacion, BIN_TO_UUID(user_id) as user_id FROM confirmandos WHERE id = UUID_TO_BIN(?);`, [id])
    return confirmandoFormatted;
  }
}