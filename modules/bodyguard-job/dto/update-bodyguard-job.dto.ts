import { PartialType } from '@nestjs/mapped-types';
import { CreateBodyguardJobDto } from './create-bodyguard-job.dto';

export class UpdateBodyguardJobDto extends PartialType(CreateBodyguardJobDto) {
  id: number;
}
