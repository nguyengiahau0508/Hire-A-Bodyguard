import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateTrainingDayDto } from "src/modules/training-day/dto/create-training-day.dto";

export class CreateTranningCatalogDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;


  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @Type(() => Date)
  start_at: Date;

  @IsDate()
  @Type(() => Date)
  end_at: Date;

  @IsArray()
  @Type(() => CreateTrainingDayDto)
  days?: CreateTrainingDayDto[];
}


