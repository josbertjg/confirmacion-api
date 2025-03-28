import { RowDataPacket } from "mysql2";
import { Connection } from "../config/connection"
import bcrypt from "bcrypt"

export class CatequistaModel extends Connection {
  constructor() {
    super(); // Llama al constructor de la clase padre (Connection)
  }

  async getAll () {
    const catequistas = await this.db.query(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(user_id) as user_id FROM catequistas;`)
    return catequistas
  }

  async getById ({id}: {id: string}) {
    const [catequista] = await this.db.query(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(user_id) as user_id FROM catequistas WHERE id = UUID_TO_BIN(?);`, [id])
    return catequista;
  }

  async activate ({id}: {id: string}) {
    const [catequista] = await this.db.query<RowDataPacket[]>(`SELECT * FROM catequistas WHERE id = ?;`, [id])
    if(catequista.length > 0) return {error: "El catequista ya se encuentra activo"}

    await this.db.query(`INSERT INTO catequistas (user_id) VALUES (UUID_TO_BIN(?));`, [id])

    const [infoCatequista] = await this.db.query<RowDataPacket[]>(`SELECT cedula FROM users WHERE id = UUID_TO_BIN(?);`, [id])
    const [{cedula}] = infoCatequista
    const cedulaSinChar = Array.from(cedula).slice(1).join('')
    const hashedPassword = await bcrypt.hash(cedulaSinChar, 10);

    await this.db.query(`UPDATE users SET password = ? WHERE id = UUID_TO_BIN(?);`, [hashedPassword,id])

    return {message: "Catequista activado exitosamente"};
  }

}