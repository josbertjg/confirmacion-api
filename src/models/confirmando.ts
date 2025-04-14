import { Connection } from "../config/connection"
import bcrypt from "bcrypt"
import { Confirmando, InputAdminEditConfirmando, InputEditConfirmando, PublicAllDataConfirmando, publicConfirmando, returnPublicAllDataConfirmando, returnPublicConfirmando } from "../schemas/confirmando";
import { NotFoundError, ValidationError } from "../utils/errors";
import { prepareUpdateQuery } from "../utils/query";
import { User } from "../schemas/user";
import { Confirmacion } from "../schemas/confirmacion";
import { Ubicacion } from "../schemas/ubicacion";
import { GrupoVida } from "../schemas/grupoVida";
export class ConfirmandoModel {
  static async getAll (): Promise<publicConfirmando[]> {

    const confirmandos = await Connection.query<Partial<Confirmando & User>[]>(`
      SELECT 
        BIN_TO_UUID(c.id) AS id,
        c.inscrito,
        c.primera_comunion,
        c.activo,
        c.created_at,
        c.updated_at,
        u.nombre,
        u.apellido,
        u.email,
        u.picture,
        u.cedula,
        u.phone,
        u.role,
        u.born_date
      FROM 
        confirmandos c INNER JOIN users u ON c.user_id = u.id
      `)

    return returnPublicConfirmando(confirmandos) as publicConfirmando[]
  }

  static async getById ({id}: {id: string}): Promise<PublicAllDataConfirmando> {
    const [confirmando] = await Connection.query<Partial<Confirmando & User>[]>(`
      SELECT 
        BIN_TO_UUID(c.id) AS id,
        c.inscrito,
        c.primera_comunion,
        c.activo,
        c.created_at,
        c.updated_at,
        BIN_TO_UUID(c.id_confirmacion) AS id_confirmacion,
        c.grupoVida_id,
        u.nombre,
        u.apellido,
        u.email,
        u.picture,
        u.cedula,
        u.phone,
        u.role,
        u.born_date,
        u.id_ubicacion
      FROM 
        confirmandos c INNER JOIN users u ON c.user_id = u.id
      `, [id])

    if(!confirmando) throw new NotFoundError({message: "Confirmando no encontrado"});

    const [confirmacion] = await Connection.query<Confirmacion[]>(`SELECT *, BIN_TO_UUID(id) as id FROM confirmaciones WHERE id = UUID_TO_BIN(?);`,[confirmando.id_confirmacion])
    const [ubicacion] = await Connection.query<Ubicacion[]>(`SELECT * FROM ubicaciones WHERE id = ?;`,[confirmando.id_ubicacion])
    const [grupo_vida] = await Connection.query<GrupoVida[]>(`SELECT *, BIN_TO_UUID(id) as id FROM grupos_vida WHERE id = UUID_TO_BIN(?);`,[confirmando.grupoVida_id])

    const formattedConfirmando = {
      ...confirmando,
      confirmacion,
      ubicacion,
      grupo_vida
    }

    return returnPublicAllDataConfirmando(formattedConfirmando);
  }

  static async edit ({id, data}: {id: string, data: Partial<InputEditConfirmando & InputAdminEditConfirmando>}) {
    // Validando que se proporcionaron datos
    if(Object.entries(data).length === 0) throw new ValidationError({message: "No se proporcionaron datos para editar"});

    // Validando que el confirmando exista
    const confirmandos = await Connection.query<Confirmando[]>(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(user_id) as user_id, BIN_TO_UUID(id_confirmacion) as id_confirmacion FROM confirmandos WHERE id = UUID_TO_BIN(?);`, [id])
    if(confirmandos.length === 0) throw new NotFoundError({message: "Confirmando no encontrado"});

    const confirmando = confirmandos[0];


    if('primera_comunion' in data) {
      const confirmandoUpdater = prepareUpdateQuery({tableName: "confirmandos", data: {primera_comunion: data.primera_comunion}, where: "WHERE id = UUID_TO_BIN(?);"})
      await Connection.query(confirmandoUpdater.query, [...confirmandoUpdater.params, id])
      delete data.primera_comunion
    }

    const userUpdater = prepareUpdateQuery({tableName: "users", data, where: "WHERE id = UUID_TO_BIN(?);"})

    await Connection.query(userUpdater.query, [...userUpdater.params, confirmando.user_id])

    return {message: "Confirmando editado exitosamente"};
  }

  static async getByUserId ({id}: {id: string}): Promise<PublicAllDataConfirmando> {

    const [confirmando] = await Connection.query<Partial<Confirmando & User>[]>(`
      SELECT 
        BIN_TO_UUID(c.id) AS id,
        c.inscrito,
        c.primera_comunion,
        c.activo,
        c.created_at,
        c.updated_at,
        BIN_TO_UUID(c.id_confirmacion) AS id_confirmacion,
        c.grupoVida_id,
        u.nombre,
        u.apellido,
        u.email,
        u.picture,
        u.cedula,
        u.phone,
        u.role,
        u.born_date,
        u.id_ubicacion
      FROM 
        confirmandos c INNER JOIN users u ON c.user_id = u.id AND
        c.user_id = UUID_TO_BIN(?);
      `, [id])

    if(!confirmando) throw new NotFoundError({message: "Confirmando no encontrado"});

    const [confirmacion] = await Connection.query<Confirmacion[]>(`SELECT *, BIN_TO_UUID(id) as id FROM confirmaciones WHERE id = UUID_TO_BIN(?);`,[confirmando.id_confirmacion])
    const [ubicacion] = await Connection.query<Ubicacion[]>(`SELECT * FROM ubicaciones WHERE id = ?;`,[confirmando.id_ubicacion])
    const [grupo_vida] = await Connection.query<GrupoVida[]>(`SELECT *, BIN_TO_UUID(id) as id FROM grupos_vida WHERE id = UUID_TO_BIN(?);`,[confirmando.grupoVida_id])

    const formattedConfirmando = {
      ...confirmando,
      confirmacion,
      ubicacion,
      grupo_vida
    }

    return returnPublicAllDataConfirmando(formattedConfirmando);
  }

  static async inscribir ({id_confirmando}: {id_confirmando: string}) {
    const confirmandoInscrito = await Connection.query(`
      SELECT c.inscrito, u.nombre, u.apellido, u.cedula, BIN_TO_UUID(u.id) as user_id
      FROM confirmandos c
      INNER JOIN users u ON c.user_id = u.id
      WHERE c.id = UUID_TO_BIN(?);`, [id_confirmando])

    if(confirmandoInscrito.length === 0) throw new NotFoundError({message: "Confirmando no encontrado"})

    const confirmando = confirmandoInscrito[0]
    if(confirmando.inscrito) throw new ValidationError({message: `El confirmando ${confirmando.nombre} ${confirmando.apellido} de cedula: ${confirmando.cedula} ya se encuentra inscrito`})

    await Connection.query(`UPDATE confirmandos SET inscrito = 1 WHERE id = UUID_TO_BIN(?);`, [id_confirmando])

    confirmando.inscrito = true;

    const cedulaSinChar = Array.from(confirmando.cedula).slice(1).join('')
    const hashedPassword = await bcrypt.hash(cedulaSinChar, 10);
    await Connection.query(`UPDATE users SET password = ? WHERE id = UUID_TO_BIN(?);`, [hashedPassword, confirmando.user_id])

    return { message: "Confirmando inscrito exitosamente", confirmando: confirmando};
  }
}