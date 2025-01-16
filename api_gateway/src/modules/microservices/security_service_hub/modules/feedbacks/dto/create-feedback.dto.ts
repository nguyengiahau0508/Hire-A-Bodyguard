import { ApiProperty } from "@nestjs/swagger"

export class CreateFeedbackDto {
  userId: number;

  @ApiProperty({
    description: 'Nội dung của feedback',
    example: 'Dịch vụ rất tốt, tôi rất hài lòng!',
    type: String,
  })
  content: string;

  @ApiProperty({
    description: 'ID của yêu cầu dịch vụ liên quan',
    example: 101,
    type: Number,
  })
  serviceRequestId: number;
}

