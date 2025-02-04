import { registerAs } from "@nestjs/config";

export default registerAs('BODYGUARD_SERVICE', () => ({
  url: process.env.BODYGUARD_SERVICE_URL,
  name: process.env.BODYGUARD_SERVICE_NAME,
  host: process.env.BODYGUARD_SERVICE_HOST,
  port: process.env.BODYGUARD_SERVICE_PORT
}))


