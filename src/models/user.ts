import { Connection } from "../config/connection"
import { returnPublicUsers, User } from "../schemas/user";

export class UserModel {
  static async getAll () {
    const users = await Connection.query<User[]>(`SELECT *, BIN_TO_UUID(id) as id FROM users;`)
    const formattedUsers = returnPublicUsers(users)
    return formattedUsers
  }

  static async getById ({id}: {id: string}) {
    const [user] = await Connection.query<User[]>(`SELECT *, BIN_TO_UUID(id) as id FROM users WHERE id = UUID_TO_BIN(?);`, [id])
    const formattedUser = returnPublicUsers(user)
    return formattedUser;
  }

}