import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsNotEmpty()
  @IsString()
  description: string
}
