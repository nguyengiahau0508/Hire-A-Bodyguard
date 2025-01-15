import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateServiceRequestDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  serviceId: number

  @IsString()
  note: string

  @IsNumber()
  @IsNotEmpty()
  numberOfHours: number

  @IsNumber()
  @IsNotEmpty()
  numberOfGuards: number
}
