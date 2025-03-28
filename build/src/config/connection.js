import mysql from "mysql2/promise";
const DEFAULT_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'confirmaciondb'
};
export class Connection {
    constructor() {
        var _a;
        //@ts-ignore
        this._config = (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : DEFAULT_CONFIG;
        this.connect();
    }
    async connect() {
        this.db = await mysql.createConnection(this._config);
    }
}
