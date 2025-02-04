import { PartialType } from '@nestjs/mapped-types';
import { CreateBodyguardDto } from './create-bodyguard.dto';

export class UpdateBodyguardDto extends PartialType(CreateBodyguardDto) {
  id: number;
}
