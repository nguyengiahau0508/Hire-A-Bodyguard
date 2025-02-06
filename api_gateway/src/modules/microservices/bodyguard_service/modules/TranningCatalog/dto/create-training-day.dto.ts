import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateTrainingDayDto {
  @ApiProperty({
    description: "Ngày tập luyện (YYYY-MM-DD)",
    example: "2025-03-01T00:00:00.000Z",
    type: "string",
    format: "date",
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  day: Date;
}


