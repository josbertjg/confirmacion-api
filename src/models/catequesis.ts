import { Connection } from "../config/connection"
import { Catequesis } from "../schemas/catequesis"

export class CatequesisModel  {
  static async getAll (): Promise<Catequesis[]> {
    const catequesis = await Connection.query<Catequesis[]>("SELECT * FROM catequesis")
    return catequesis
  }

  static async getById ({id}: any) {
    return id
  }

  static async create (data: any) {
    const result = await Connection.query("INSERT INTO catequesis (title, fecha, hora_inicio, hora_fin, descripcion_catequistas, descripcion, type, )")
    return result
  }

  static async update (data: any) {
    return data
  }

  static async delete (id: any) {
    return id
  }
}