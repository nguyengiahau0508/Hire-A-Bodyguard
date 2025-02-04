import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  serviceRequestId: number

  @IsString()
  note: string
}
