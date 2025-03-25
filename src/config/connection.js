import mysql from "mysql2/promise"

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'confirmaciondb'
}

const config = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const conn = await mysql.createConnection(config)

export class Connection {

  _config = config
  db = null

  constructor() {
    this.db = conn
  }

}