import { Connection } from "../config/connection.js"

export class CatequesisModel extends Connection {
  constructor() {
    super(); // Llama al constructor de la clase padre (Connection)
  }

  async getAll () {
    // console.log(this.db)
    const result = await this.db.query("SELECT * FROM catequesis")
    console.log(result)
    return []
  }

  async getById ({id}) {
    return id
  }

  async create (data) {
    const result = await this.conn.query("INSERT INTO catequesis (title, fecha, hora_inicio, hora_fin, descripcion_catequistas, descripcion, type, )")
    return data
  }

  async update (data) {
    return data
  }

  async delete (d) {
    return id
  }
}