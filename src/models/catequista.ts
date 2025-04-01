import { Connection } from "../config/connection"
import { Catequista } from "../schemas/catequista";
import bcrypt from "bcrypt"
import { ValidationError } from "../utils/errors";
import { User } from "../schemas/user";

export class CatequistaModel {
  static async getAll (): Promise<Catequista[]> {
    const catequistas = await Connection.query<Catequista[]>(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(user_id) as user_id FROM catequistas;`)
    return catequistas
  }

  static async getById ({id}: {id: string}): Promise<Catequista> {
    const [catequista] = await Connection.query<Catequista[]>(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(user_id) as user_id FROM catequistas WHERE id = UUID_TO_BIN(?);`, [id])
    return catequista;
  }

  static async activate ({user_id}: {user_id: string}) {
    const users = await Connection.query<User[]>(`SELECT * FROM users WHERE id = UUID_TO_BIN(?) AND role = "CATEQUISTA";`, [user_id])

    if(users.length === 0) throw new ValidationError({message: "El usuario no existe o no es un catequista"})

    const catequista = await Connection.query<Catequista[]>(`SELECT * FROM catequistas WHERE user_id = UUID_TO_BIN(?);`, [user_id])
    if(catequista.length > 0) throw new ValidationError({message: "El catequista ya se encuentra activo"})

    await Connection.query(`INSERT INTO catequistas (user_id) VALUES (UUID_TO_BIN(?));`, [user_id])

    const infoCatequista = await Connection.query(`SELECT cedula FROM users WHERE id = UUID_TO_BIN(?);`, [user_id])
    const [{cedula}] = infoCatequista
    const cedulaSinChar = Array.from(cedula).slice(1).join('')
    const hashedPassword = await bcrypt.hash(cedulaSinChar, 10);

    await Connection.query(`UPDATE users SET password = ? WHERE id = UUID_TO_BIN(?);`, [hashedPassword,user_id])

    return {message: "Catequista activado exitosamente"};
  }

}