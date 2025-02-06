import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TranningCatalogService } from './tranning_catalog.service';
import { CreateTranningCatalogDto } from './dto/create-tranning_catalog.dto';
import { UpdateTranningCatalogDto } from './dto/update-tranning_catalog.dto';
import { TRANNING_CATALOG } from '../message.pattern';
import { PageOptionsDto } from 'src/commons/shared/pagination/dtos';

@Controller()
export class TranningCatalogController {
  constructor(private readonly tranningCatalogService: TranningCatalogService) { }

  @MessagePattern(TRANNING_CATALOG.CREATE_AND_SAVE)
  async createAndSave(@Payload() payload: { dto: CreateTranningCatalogDto }) {
    const { dto } = payload
    return {
      data: await this.tranningCatalogService.createAndSave(dto)
    }
  }

  @MessagePattern(TRANNING_CATALOG.FINDALL)
  findAll(@Payload() payload: { pageOptionsDto: PageOptionsDto }) {
    const { pageOptionsDto } = payload
    return this.tranningCatalogService.getAll(pageOptionsDto);
  }

  @MessagePattern(TRANNING_CATALOG.FINDONE)
  async findOne(@Payload() payload: { id: number }) {
    const { id } = payload
    return {
      data: await this.tranningCatalogService.findByCondition({ where: { id }, relations: ['days'] })
    }
  }

  @MessagePattern(TRANNING_CATALOG.UPDATE)
  async update(@Payload() payload: { id: number, dto: UpdateTranningCatalogDto }) {
    const { id, dto } = payload
    return {
      data: await this.tranningCatalogService.updateCustome(id, dto)
    }
  }
}
