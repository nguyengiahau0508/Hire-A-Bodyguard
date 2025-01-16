
import { ApiProperty } from "@nestjs/swagger";

export class CreateServiceRequestDto {
  userId: number;

  @ApiProperty({
    description: "ID của dịch vụ được yêu cầu",
    example: 101,
  })
  serviceId: number;

  @ApiProperty({
    description: "Ghi chú thêm về yêu cầu (nếu có)",
    example: "Cần vệ sĩ có kỹ năng nói tiếng Anh",
    required: false,
  })
  note: string;

  @ApiProperty({
    description: "Số giờ yêu cầu dịch vụ",
    example: 8,
  })
  numberOfHours: number;

  @ApiProperty({
    description: "Số lượng vệ sĩ yêu cầu",
    example: 2,
  })
  numberOfGuards: number;
}

