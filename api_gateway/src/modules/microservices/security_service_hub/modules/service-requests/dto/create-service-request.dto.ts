import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateServiceRequestDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  serviceId: number

  @IsString()
  @ApiProperty()
  note: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  numberOfHours: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  numberOfGuards: number
}
