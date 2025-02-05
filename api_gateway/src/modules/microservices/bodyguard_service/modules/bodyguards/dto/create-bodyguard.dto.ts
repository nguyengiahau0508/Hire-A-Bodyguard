import { ApiProperty } from '@nestjs/swagger';

export class CreateBodyguardDto {
  userId: number;

  @ApiProperty({
    example: 2,
    description: 'ID của công việc mà bodyguard nhận',
  })
  jobId: number;

  @ApiProperty({
    example: 3,
    description: 'ID của đơn hàng liên quan đến bodyguard',
  })
  orderId: number;
}

