import { Connection } from "../config/connection"
import { Parroquia } from "../schemas/Parroquia";

export class ParroquiaModel {
  static async getAll (): Promise<Parroquia[]> {
    const parroquias = await Connection.query<Parroquia[]>(`SELECT * FROM parroquias;`)
    return parroquias
  }

  static async getById ({id}: {id: number}): Promise<Parroquia> {
    const [parroquia] = await Connection.query<Parroquia[]>(`SELECT * FROM parroquias WHERE id = ?;`, [id])
    return parroquia;
  }

}