import { Connection } from "../config/connection.js"
import bcrypt from "bcrypt"
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
    const [confirmandoInscrito] = await this.db.query(`
      SELECT c.inscrito, u.nombre, u.apellido, u.cedula, BIN_TO_UUID(u.id) as user_id
      FROM confirmandos c
      INNER JOIN users u ON c.user_id = u.id
      WHERE c.id = UUID_TO_BIN(?);`, [id])

    const confirmando = confirmandoInscrito[0]
    if(confirmando.inscrito) return {error: `El confirmando ${confirmando.nombre} ${confirmando.apellido} de cedula: ${confirmando.cedula} ya se encuentra inscrito`}

    await this.db.query(`UPDATE confirmandos SET inscrito = 1 WHERE id = UUID_TO_BIN(?);`, [id])

    confirmando.inscrito = true;

    const cedulaSinChar = Array.from(confirmando.cedula).slice(1).join('')
    const hashedPassword = await bcrypt.hash(cedulaSinChar, 10);
    await this.db.query(`UPDATE users SET password = ? WHERE id = UUID_TO_BIN(?);`, [hashedPassword, confirmando.user_id])

    return confirmando;
  }
}