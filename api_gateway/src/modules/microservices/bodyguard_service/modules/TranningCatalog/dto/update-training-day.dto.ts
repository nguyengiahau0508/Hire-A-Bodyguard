import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingDayDto } from './create-training-day.dto';

export class UpdateTrainingDayDto extends PartialType(CreateTrainingDayDto) {
  id: number;
}
