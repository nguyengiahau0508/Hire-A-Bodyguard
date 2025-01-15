import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsNumber()
  serviceRequestId: number
}
