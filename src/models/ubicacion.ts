import { Connection } from "../config/connection"
import { InputCreateUbicacion, InputEditUbicacion, Ubicacion } from "../schemas/ubicacion";
import { prepareUpdateQuery } from "../utils/query";

export class UbicacionModel {
  static async getAll (): Promise<Ubicacion[]> {
    const ubicaciones = await Connection.query<Ubicacion[]>(`SELECT * FROM ubicaciones;`)
    return ubicaciones
  }

  static async getById ({id}: {id: number}): Promise<Ubicacion> {
    const [ubicacion] = await Connection.query<Ubicacion[]>(`SELECT * FROM ubicaciones WHERE id = ?;`, [id])
    return ubicacion;
  }

  static async getByUserId ({user_id}: {user_id: string}): Promise<Ubicacion> {
    const [ubicacion] = await Connection.query<Ubicacion[]>(`
      SELECT * FROM ubicaciones ub 
      INNER JOIN users u ON u.id_ubicacion = ub.id
      WHERE u.id = UUID_TO_BIN(?);`, [user_id])
    return ubicacion;
  }

  static async create (data: InputCreateUbicacion): Promise<{message: string, id_ubicacion: number}> {
    const result = await Connection.query(`INSERT INTO ubicaciones (address, latitude, longitude) VALUES (?,?,?);`, [data.address, data.latitude, data.longitude])
    return {message: "Ubicacion creada exitosamente", id_ubicacion: result.insertId};
  }

  static async edit ({id, data}: {id: number, data: Partial<InputEditUbicacion>}) {
    const {query, params} = prepareUpdateQuery({tableName: "ubicaciones", data, where: "WHERE id = ?;"})
    await Connection.query(query, [...params, id])

    return {message: "Ubicacion editada exitosamente"};
  }

  static async delete ({id}: {id: number}) {
    await Connection.query(`DELETE FROM ubicaciones WHERE id = ?;`, [id])
    return {message: "Ubicacion eliminada exitosamente"};
  }
}