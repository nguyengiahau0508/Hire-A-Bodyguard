
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {

  userId: number;

  @ApiProperty({
    description: 'ID của yêu cầu dịch vụ liên quan đến đơn hàng',
    example: 101,
  })
  serviceRequestId: number;

  @ApiProperty({
    description: 'Tổng số tiền của đơn hàng',
    example: 5000000,
  })
  totalAmount: number;

  @ApiProperty({
    description: 'Ghi chú thêm cho đơn hàng (nếu có)',
    example: 'Cần xử lý đơn hàng gấp trước ngày mai',
    required: false,
  })
  note: string;
}

