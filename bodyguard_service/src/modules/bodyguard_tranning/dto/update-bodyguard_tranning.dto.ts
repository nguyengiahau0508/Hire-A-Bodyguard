import { PartialType } from '@nestjs/mapped-types';
import { CreateBodyguardTranningDto } from './create-bodyguard_tranning.dto';

export class UpdateBodyguardTranningDto extends PartialType(CreateBodyguardTranningDto) {
  id: number;
}
