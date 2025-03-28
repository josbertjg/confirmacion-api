import { RowDataPacket } from "mysql2";
import { Connection } from "../config/connection"
import { returnPublicUsers, User } from "../schemas/user";

export class UserModel extends Connection {
  constructor() {
    super(); // Llama al constructor de la clase padre (Connection)
  }

  async getAll () {
    const [users] = await this.db.query<User[] & RowDataPacket[]>(`SELECT *, BIN_TO_UUID(id) as id FROM users;`)
    const formattedUsers = returnPublicUsers(users)
    return formattedUsers
  }

  async getById ({id}: {id: string}) {
    const [user] = await this.db.query<User[] & RowDataPacket[]>(`SELECT *, BIN_TO_UUID(id) as id FROM users WHERE id = UUID_TO_BIN(?);`, [id])
    const formattedUser = returnPublicUsers(user)
    return formattedUser;
  }

}