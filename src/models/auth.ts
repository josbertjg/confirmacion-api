import { Connection } from "../config/connection"
import { ConfirmacionModel } from "./confirmacion";
import { randomUUID } from "node:crypto"
import bcrypt from "bcrypt"
import { InputLogin } from "../schemas/login";
import { User } from "../schemas/user";
import { InputRegisterConfirmando } from "../schemas/confirmando";
import { InputRegisterCatequista } from "../schemas/catequista";
import { ValidationError } from "../utils/errors";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token";
import { UbicacionModel } from "./ubicacion";

export class AuthModel {
  static async login (inputs: InputLogin) {
    const users = await Connection.query<User[]>("SELECT *, BIN_TO_UUID(id) as id FROM users WHERE email = ?", [inputs.email])

    if(users.length == 0) throw new ValidationError({message: 'Correo o contraseña incorrectos, si no tienes una cuenta ponte en contacto con algun catequista de tu parroquia'})
    
    const user = users[0]

    if(user.password == null || !user.password) throw new ValidationError({message: 'Correo o contraseña incorrectos, es probable que tu usuario se encuentre inactivo, ponte en contacto con los catequistas de tu parroquia'})
    
    const isValidPassword = await bcrypt.compare(inputs.password, user.password)

    if(isValidPassword) return {message: "Login exitoso", access_token: generateAccessToken({id: user.id, role: user.role}), refresh_token: generateRefreshToken({id: user.id, role: user.role})}
    else throw new ValidationError({message: 'Correo o contraseña incorrectos'})
  }

  static async refreshToken(refreshToken: string) {
    const refreshData = verifyRefreshToken(refreshToken)
    const users = await Connection.query<User[]>("SELECT *, BIN_TO_UUID(id) as id FROM users WHERE id = UUID_TO_BIN(?)", [refreshData.id])

    if(users.length == 0) throw new ValidationError({message: "Algo ha ido mal"})

    const user = users[0]

    return generateAccessToken({id: user.id, role: user.role})
  }

  static async registrarConfirmando (inputs: InputRegisterConfirmando) {

    // Validando que exista una confirmacion activa en este momento
    const confirmacion = await ConfirmacionModel.getConfirmacionInscribiendoActual({id_parroquia: inputs.id_parroquia})

    // Validando que no exista un usuario con el correo recibido
    const email = await Connection.query<User[]>("SELECT * FROM users WHERE LOWER(email) = ?", [inputs.email.toLowerCase()])
    if(email.length > 0) throw new ValidationError({message: "Ya existe un usuario con este correo electronico"})

    // Validando que no exista un usuario con la cedula recibida
    const cedula = await Connection.query<User[]>("SELECT * FROM users WHERE cedula = ?", [inputs.cedula])
    if(cedula.length > 0) throw new ValidationError({message: "Ya existe un usuario con este cedula"})

    // Ingresando/Creando la ubicacion del confirmando
    const {id_ubicacion} = await UbicacionModel.create({address: inputs.address, latitude: inputs.latitude, longitude: inputs.longitude})

    // Creando el usuario
    const userId = randomUUID();
    await Connection.query(`INSERT INTO users 
      (id, nombre, apellido, email, cedula, phone, role, born_date, id_ubicacion, id_parroquia) 
      VALUES (UUID_TO_BIN(?),?, ?, ?, UPPER(?), ?, ?, ?, ?, ?);`, 
      [userId,inputs.nombre, inputs.apellido, inputs.email, inputs.cedula, inputs.phone, "CONFIRMANDO", inputs.born_date, id_ubicacion, inputs.id_parroquia])

    const confirmandoId = randomUUID();
    // Creando el confirmando
    await Connection.query(`INSERT INTO confirmandos 
      (id,user_id, id_confirmacion, primera_comunion) 
      VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?), UUID_TO_BIN(?), ?)`,
      [confirmandoId,userId, confirmacion.id, inputs.primera_comunion]
    )
    
    return {message: "Confirmando registrado exitosamente", id_confirmando: confirmandoId}
  }

  static async registrarCatequista (inputs: InputRegisterCatequista) {
    // Validando que no exista un usuario con el correo recibido
    const email = await Connection.query<User[]>("SELECT * FROM users WHERE LOWER(email) = ?", [inputs.email.toLowerCase()])
    if(email.length > 0) throw new ValidationError({message: "Ya existe un usuario con este correo electronico"})

    // Validando que no exista un usuario con la cedula recibida
    const cedula = await Connection.query<User[]>("SELECT * FROM users WHERE cedula = ?", [inputs.cedula])
    if(cedula.length > 0) throw new ValidationError({message: "Ya existe un usuario con este cedula"})

    // Ingresando/Creando la ubicacion del catequista
    const {id_ubicacion} = await UbicacionModel.create({address: inputs.address, latitude: inputs.latitude, longitude: inputs.longitude})
    
    // Creando el usuario
    const userId = randomUUID();
    await Connection.query(`INSERT INTO users 
      (id, nombre, apellido, email, cedula, phone, role, born_date, id_ubicacion, id_parroquia) 
      VALUES (UUID_TO_BIN(?),?, ?, ?, UPPER(?), ?, ?, ?, ?, ?);`, 
      [userId,inputs.nombre, inputs.apellido, inputs.email, inputs.cedula, inputs.phone, "CATEQUISTA", inputs.born_date, id_ubicacion, inputs.id_parroquia])
    return {message: "Catequista registrado exitosamente"}
  }
}