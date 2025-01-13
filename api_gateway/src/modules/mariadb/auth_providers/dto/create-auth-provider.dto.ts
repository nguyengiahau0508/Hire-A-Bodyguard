import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthProviderDto {
  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsNotEmpty()
  @IsString()
  providerId: string;
}
