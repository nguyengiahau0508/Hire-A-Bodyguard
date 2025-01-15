
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID của người dùng thực hiện đơn hàng',
    example: 1,
  })
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID của yêu cầu dịch vụ',
    example: 123,
  })
  serviceRequestId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tổng số tiền của đơn hàng',
    example: 500000,
  })
  totalAmount: number;

  @IsString()
  @ApiProperty({
    description: 'Ghi chú cho đơn hàng',
    example: 'Yêu cầu bảo vệ chuyên nghiệp, làm việc từ 8h đến 16h',
    required: false,
  })
  note: string;
}

