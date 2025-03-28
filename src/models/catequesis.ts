import { Connection } from "../config/connection"

export class CatequesisModel extends Connection {
  constructor() {
    super(); // Llama al constructor de la clase padre (Connection)
  }

  async getAll () {
    const result = await this.db.query("SELECT * FROM catequesis")
    return result
  }

  async getById ({id}: any) {
    return id
  }

  async create (data: any) {
    const result = await this.db.query("INSERT INTO catequesis (title, fecha, hora_inicio, hora_fin, descripcion_catequistas, descripcion, type, )")
    return result
  }

  async update (data: any) {
    return data
  }

  async delete (id: any) {
    return id
  }
}