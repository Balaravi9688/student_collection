import config from "../config/index.js";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});

export default pool;
