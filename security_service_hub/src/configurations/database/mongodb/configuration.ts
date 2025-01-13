
import { registerAs } from "@nestjs/config";

export default registerAs('mongodb', () => ({
  mongodbUrl: process.env.MONGODB_DB_URL
}));
