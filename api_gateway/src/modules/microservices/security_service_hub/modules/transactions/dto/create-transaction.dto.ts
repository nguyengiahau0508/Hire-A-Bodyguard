import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {
  @ApiProperty()
  orderId: number

  @ApiProperty({
    example: new Date().toISOString(),
  })
  paymentTerm: Date;

  @ApiProperty()
  amount: number

}
