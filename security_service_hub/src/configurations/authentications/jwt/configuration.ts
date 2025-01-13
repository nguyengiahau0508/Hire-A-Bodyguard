import { registerAs } from "@nestjs/config";

export default registerAs('jwtAuth', () => ({
  secret: process.env.JWT_SECRET,
  accessExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  refreshExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
}))

