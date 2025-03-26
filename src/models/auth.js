import { Connection } from "../config/connection.js"
import { ConfirmacionModel } from "./confirmacion.js";
import { randomUUID } from "node:crypto"

const confirmacionModel = new ConfirmacionModel()

export class AuthModel extends Connection {
  constructor() {
    super(); // Llama al constructor de la clase padre (Connection)
  }

  async login (inputs) {
    const [users] = await this.db.query("SELECT *, BIN_TO_UUID(id) as id FROM users WHERE email = ? AND password = ?", [inputs.email, inputs.password])
    if(users.length > 0) return {message: "Login exitoso"}
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

    // Creando el confirmando
    await this.db.query(`INSERT INTO confirmandos 
      (user_id, id_confirmacion, primera_comunion) 
      VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?)`,
      [userId, confirmacion.id, inputs.primera_comunion]
    )
    
    return {message: "Confirmando registrado exitosamente"}
  }

  async registrarCatequista (inputs) {
    // Validando que no exista un usuario con el correo recibido
    const [email] = await this.db.query("SELECT * FROM users WHERE LOWER(email) = ?", [inputs.email.toLowerCase()])
    console.log('email: ',email.length > 0)
    if(email.length > 0) return {error: "Ya existe un usuario con este correo electronico"}

    // Validando que no exista un usuario con la cedula recibida
    const [cedula] = await this.db.query("SELECT * FROM users WHERE cedula = ?", [inputs.cedula])
    console.log('cedula: ',cedula)
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