import { IsNotEmpty, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateTrainingDayDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  day: Date;
}


