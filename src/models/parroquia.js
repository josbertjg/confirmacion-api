import { Connection } from "../config/connection.js"

export class ParroquiaModel extends Connection {
  constructor() {
    super(); // Llama al constructor de la clase padre (Connection)
  }

  async getAll () {
    const parroquias = await this.db.query(`SELECT * FROM parroquias;`)
    return parroquias
  }

  async getById ({id}) {
    const [parroquia] = await this.db.query(`SELECT * FROM parroquias WHERE id = ?;`, [id])
    return parroquia;
  }

}