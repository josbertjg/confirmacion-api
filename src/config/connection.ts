import mysql, { ConnectionOptions } from "mysql2/promise"

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'confirmaciondb'
}

export class Connection {
  //@ts-ignore
  private _config: ConnectionOptions = process.env.DATABASE_URL ?? DEFAULT_CONFIG;
  protected db!: mysql.Connection; // Se usa '!' para indicar que será inicializado en el constructor

  constructor() {
    this.connect();
  }

  private async connect(): Promise<void> {
    this.db = await mysql.createConnection(this._config);
  }
}