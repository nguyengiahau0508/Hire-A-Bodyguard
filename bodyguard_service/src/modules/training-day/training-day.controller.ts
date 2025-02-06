import { Controller } from '@nestjs/common';
import { TrainingDayService } from './training-day.service';

@Controller()
export class TrainingDayController {
  constructor(private readonly trainingDayService: TrainingDayService) { }
}
