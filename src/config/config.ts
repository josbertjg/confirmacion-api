export const {
  // SQL
  PORT = 3306,
  HOST = "localhost",
  USER = "root",
  PASSWORD = "",
  DATABASE = "confirmaciondb",

  // POOL
  WAIT_FOR_CONNECTIONS = "true",      // Espera si no hay conexiones disponibles
  CONNECTION_LIMIT = "10",            // Máximo 10 conexiones simultáneas
  QUEUE_LIMIT = "0",                  // Sin límite de solicitudes en espera
  CONNECT_TIMEOUT = "10000",          // Tiempo máximo para conectar con la BD
  IDLE_TIMEOUT = "30000",             // Cierra conexiones inactivas después de 30 segundos
  MAX_IDLE = "3",                     // Máximo 5 conexiones inactivas antes de cerrarlas
  KEEP_ALIVE_INITIAL_DELAY = "15000", // Mantiene conexiones activas cada 15 segundos
  MULTIPLE_STATEMENTS = "true",       // Seguridad: permite o no múltiples consultas en una sola solicitud

  // JWT
  SECRET_JWT_KEY = "secret_key",
} = process.env

export const DBConfig = {
  port: Number(PORT),
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
}

export const poolConfig = {
  waitForConnections: WAIT_FOR_CONNECTIONS === "true", // Convierte a booleano
  connectionLimit: Number(CONNECTION_LIMIT),
  queueLimit: Number(QUEUE_LIMIT),
  connectTimeout: Number(CONNECT_TIMEOUT),
  idleTimeout: Number(IDLE_TIMEOUT),
  maxIdle: Number(MAX_IDLE),
  keepAliveInitialDelay: Number(KEEP_ALIVE_INITIAL_DELAY),
  multipleStatements: MULTIPLE_STATEMENTS === "true" // Convierte a booleano
}

