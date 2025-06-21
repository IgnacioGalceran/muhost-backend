import "dotenv/config";
import sql from "mssql";

const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: "localhost",
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustedConnection: true,
    enableArithAbort: true,
  },
  parseJSON: true,
};

let pool: sql.ConnectionPool | null = null;

export const connectDB = async () => {
  if (pool) {
    return pool;
  }

  try {
    pool = await sql.connect(dbConfig);
    console.log("✅ Conectado a SQL Server");
    return pool;
  } catch (error) {
    console.error("❌ Error conectando a SQL Server:", error);
    throw error;
  }
};

export default sql;
