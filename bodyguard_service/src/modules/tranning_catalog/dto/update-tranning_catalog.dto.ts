import { PartialType } from '@nestjs/mapped-types';
import { CreateTranningCatalogDto } from './create-tranning_catalog.dto';

export class UpdateTranningCatalogDto extends PartialType(CreateTranningCatalogDto) {
  id: number;
}
