import { registerAs } from "@nestjs/config";

export default registerAs('SECURITY_SERVICE_HUB', () => ({
  url: process.env.SECURITY_SERVICE_HUB_URL,
  name: process.env.SECURITY_SERVICE_HUB_NAME,
  host: process.env.SECURITY_SERVICE_HUB_HOST,
  port: process.env.SECURITY_SERVICE_HUB_PORT
}))


