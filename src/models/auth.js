import { Connection } from "../config/connection.js"
import { ConfirmacionModel } from "./confirmacion.js";
import { randomUUID } from "node:crypto"

const confirmacionModel = new ConfirmacionModel()

export class AuthModel extends Connection {
  constructor() {
    super(); // Llama al constructor de la clase padre (Connection)
  }

  async createConfirmando (inputs) {

    // Validando que exista una confirmacion activa en este momento
    const confirmacion = await confirmacionModel.getConfirmacionActual({id_parroquia: inputs.id_parroquia})
    if(!!confirmacion.error) return {error: confirmacion.error}

    // Validando que no exista un usuario con el correo recibido
    const [email] = await this.db.query("SELECT * FROM users WHERE LOWER(email) = ?", [inputs.email.toLowerCase()])
    if(email.length > 0) return {error: "Ya existe un usuario con ese correo"}

    // Validando que no exista un usuario con la cedula recibida
    const [cedula] = await this.db.query("SELECT * FROM users WHERE cedula = ?", [inputs.cedula])
    if(cedula.length > 0) return {error: "Ya existe un usuario con esa cedula"}

    // Creando el usuario
    const userId = randomUUID();
    await this.db.query(`INSERT INTO users 
      (id, nombre, apellido, email, cedula, phone, role, born_date, id_parroquia) 
      VALUES (UUID_TO_BIN(?),?, ?, ?, ?, ?, ?, ?, ?);`, 
      [userId,inputs.nombre, inputs.apellido, inputs.email, inputs.cedula, inputs.phone, "CONFIRMANDO", inputs.born_date, inputs.id_parroquia])
      
    // Creando el confirmando
    await this.db.query(`INSERT INTO confirmandos 
      (user_id, id_confirmacion, primera_comunion) 
      VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?)`,
      [userId, confirmacion.id, inputs.primera_comunion]
    )
    
    return {message: "Confirmando registrado exitosamente"}
  }

  async getById ({id}) {
    return id
  }

  async create (data) {
    const result = await this.conn.query("INSERT INTO catequesis (title, fecha, hora_inicio, hora_fin, descripcion_catequistas, descripcion, type, )")
    return data
  }

  async update (data) {
    return data
  }

  async delete (d) {
    return id
  }
}