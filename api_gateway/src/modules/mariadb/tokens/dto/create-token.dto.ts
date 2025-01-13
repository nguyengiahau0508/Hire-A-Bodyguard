import { IsBoolean, isBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";
import { User } from "../../users/entities/user.entity";

export class CreateTokenDto {
  key: string

  type: string;

  expiresAt: Date;

  user: User;
}
