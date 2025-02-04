import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TranningCatalogService } from './tranning_catalog.service';
import { CreateTranningCatalogDto } from './dto/create-tranning_catalog.dto';
import { UpdateTranningCatalogDto } from './dto/update-tranning_catalog.dto';
import { TRANNING_CATALOG } from '../message.pattern';

@Controller()
export class TranningCatalogController {
  constructor(private readonly tranningCatalogService: TranningCatalogService) { }

  @MessagePattern(TRANNING_CATALOG.CREATE)
  create(@Payload() createTranningCatalogDto: CreateTranningCatalogDto) {
    return this.tranningCatalogService.create(createTranningCatalogDto);
  }

  @MessagePattern(TRANNING_CATALOG.FINDALL)
  findAll() {
    return this.tranningCatalogService.findAll();
  }

  @MessagePattern(TRANNING_CATALOG.FINDONE)
  findOne(@Payload() id: number) {
    return this.tranningCatalogService.findOne(id);
  }

  @MessagePattern(TRANNING_CATALOG.UPDATE)
  update(@Payload() updateTranningCatalogDto: UpdateTranningCatalogDto) {
    return this.tranningCatalogService.update(updateTranningCatalogDto.id, updateTranningCatalogDto);
  }
}
