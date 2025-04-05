import { Connection } from "../config/connection"
import { Ubicacion } from "../schemas/ubicacion";

export class UbicacionModel {
  static async getAll (): Promise<Ubicacion[]> {
    const ubicaciones = await Connection.query<Ubicacion[]>(`SELECT * as id FROM ubicaciones;`)
    return ubicaciones
  }

  static async getById ({id}: {id: number}): Promise<Ubicacion> {
    const [ubicacione] = await Connection.query<Ubicacion[]>(`SELECT * as id FROM ubicaciones WHERE id = UUID_TO_BIN(?);`, [id])
    return ubicacione;
  }
}