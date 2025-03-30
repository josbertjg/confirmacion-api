import mysql, { ConnectionOptions, Pool, RowDataPacket } from "mysql2/promise"
import { DBConfig, poolConfig } from "./config";

const CONFIG: ConnectionOptions = {
  ...DBConfig,
  ...poolConfig
};

export class Connection {
  private static pool: Pool;
  
  private constructor() {}

  private static getPool(): Pool {
    if(!Connection.pool){
      Connection.pool = mysql.createPool(CONFIG);
      console.log("Pool de conexiones creado")
    }
    return Connection.pool
  }

  public static async testConnection(): Promise<boolean> {
    try {
      const pool = Connection.getPool();
      const conn = await pool.getConnection();
      conn.release(); // Liberar conexión al pool
      return true;
    } catch (error) {
      console.error("Error de conexión a la base de datos: ", error);
      return false;
    }
  }

  public static async query<T = any>(query: string, params: any[] = []): Promise<T[]> {
    const pool = Connection.getPool();
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query<T[] & RowDataPacket[]>(query, params);
      return rows;
    } catch (e) {
      console.error("Error en la consulta SQL:", e);
      throw e;
    } finally {
      conn.release(); // Liberamos la conexion
    }
  }
}