import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  orderId: number

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  paymentTerm: Date

  @IsNumber()
  @IsNotEmpty()
  amount: number
}
