import { Connection } from "../config/connection.js"
import { ConfirmacionModel } from "./confirmacion.js";
import { randomUUID } from "node:crypto"
import bcrypt from "bcrypt"

const confirmacionModel = new ConfirmacionModel()

export class AuthModel extends Connection {
  constructor() {
    super(); // Llama al constructor de la clase padre (Connection)
  }

  async login (inputs) {
    const [users] = await this.db.query("SELECT password, email, BIN_TO_UUID(id) as id FROM users WHERE email = ?", [inputs.email])

    if(users.length == 0) return {error: 'Correo o contraseña incorrectos, si no tienes una cuenta ponte en contacto con algun catequista de tu parroquia'}
    
    const user = users[0]

    const isValidPassword = await bcrypt.compare(inputs.password, user.password)

    if(isValidPassword) return {message: "Login exitoso"}
    else return {error: 'Correo o contraseña incorrectos'}
  }

  async registrarConfirmando (inputs) {

    // Validando que exista una confirmacion activa en este momento
    const confirmacion = await confirmacionModel.getConfirmacionActual({id_parroquia: inputs.id_parroquia})
    if(!!confirmacion.error) return {error: confirmacion.error}

    // Validando que no exista un usuario con el correo recibido
    const [email] = await this.db.query("SELECT * FROM users WHERE LOWER(email) = ?", [inputs.email.toLowerCase()])
    if(email.length > 0) return {error: "Ya existe un usuario con este correo electronico"}

    // Validando que no exista un usuario con la cedula recibida
    const [cedula] = await this.db.query("SELECT * FROM users WHERE cedula = ?", [inputs.cedula])
    if(cedula.length > 0) return {error: "Ya existe un usuario con este cedula"}

    // Creando el usuario
    const userId = randomUUID();
    await this.db.query(`INSERT INTO users 
      (id, nombre, apellido, email, cedula, phone, role, born_date, id_parroquia) 
      VALUES (UUID_TO_BIN(?),?, ?, ?, UPPER(?), ?, ?, ?, ?);`, 
      [userId,inputs.nombre, inputs.apellido, inputs.email, inputs.cedula, inputs.phone, "CONFIRMANDO", inputs.born_date, inputs.id_parroquia])

    const confirmandoId = randomUUID();
    // Creando el confirmando
    await this.db.query(`INSERT INTO confirmandos 
      (id,user_id, id_confirmacion, primera_comunion) 
      VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?), UUID_TO_BIN(?), ?)`,
      [confirmandoId,userId, confirmacion.id, inputs.primera_comunion]
    )
    
    return {message: "Confirmando registrado exitosamente", id_confirmando: confirmandoId}
  }

  async registrarCatequista (inputs) {
    // Validando que no exista un usuario con el correo recibido
    const [email] = await this.db.query("SELECT * FROM users WHERE LOWER(email) = ?", [inputs.email.toLowerCase()])
    if(email.length > 0) return {error: "Ya existe un usuario con este correo electronico"}

    // Validando que no exista un usuario con la cedula recibida
    const [cedula] = await this.db.query("SELECT * FROM users WHERE cedula = ?", [inputs.cedula])
    if(cedula.length > 0) return {error: "Ya existe un usuario con este cedula"}

    // Creando el usuario
    const userId = randomUUID();
    await this.db.query(`INSERT INTO users 
      (id, nombre, apellido, email, cedula, phone, role, born_date, id_parroquia) 
      VALUES (UUID_TO_BIN(?),?, ?, ?, UPPER(?), ?, ?, ?, ?);`, 
      [userId,inputs.nombre, inputs.apellido, inputs.email, inputs.cedula, inputs.phone, "CATEQUISTA", inputs.born_date, inputs.id_parroquia])
    return {message: "Catequista registrado exitosamente"}
  }
}