
import { registerAs } from "@nestjs/config";

export default registerAs('mariadb', () => ({
  host: process.env.MARIADB_DB_HOST,
  port: parseInt(process.env.MARIADB_DB_PORT, 10) || 3306,
  username: process.env.MARIADB_DB_USERNAME,
  password: process.env.MARIADB_DB_PASSWORD,
  name: process.env.MARIADB_DB_NAME,
}));
