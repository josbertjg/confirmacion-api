import { Connection } from "../config/connection";
export class UserModel extends Connection {
    constructor() {
        super(); // Llama al constructor de la clase padre (Connection)
    }
    async getAll() {
        const catequistas = await this.db.query(`SELECT *, BIN_TO_UUID(id) as id FROM users;`);
        return catequistas;
    }
    async getById({ id }) {
        const [catequista] = await this.db.query(`SELECT *, BIN_TO_UUID(id) as id FROM users WHERE id = UUID_TO_BIN(?);`, [id]);
        return catequista;
    }
}
