import { ApiProperty } from "@nestjs/swagger"

export class CreateFeedbackDto {
  userId: number

  @ApiProperty()
  content: string

  @ApiProperty()
  serviceRequestId: number
}
