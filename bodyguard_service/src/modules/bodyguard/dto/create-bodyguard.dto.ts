import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateBodyguardDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  jobId: number

  @IsNumber()
  @IsNotEmpty()
  orderId: number
}
