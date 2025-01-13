import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAuthProviderDto } from "../../auth_providers/dto/create-auth-provider.dto";
import { Gender } from "src/common/enums/authentication/gender.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  picture: string

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAuthProviderDto)
  authProvider?: CreateAuthProviderDto;

  @IsEnum(Gender)
  gender?: Gender

  @IsString()
  address?: string

  @IsString()
  phoneNumber?: string

  @IsDate()
  birthday?: Date
}
