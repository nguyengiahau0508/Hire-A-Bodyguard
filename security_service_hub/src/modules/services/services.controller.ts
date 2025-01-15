
import { Controller } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceMessagePattern } from './enums/service-message-pattern.enum';
import { Service } from './entities/service.entity';
import { DeepPartial } from 'typeorm';
import { PageOptionsDto } from 'src/commons/shared/pagination/dtos';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @MessagePattern(ServiceMessagePattern.CREATE)
  async create(@Payload() dto: CreateServiceDto) {
    return {
      data: this.servicesService.create(dto)
    };
  }

  @MessagePattern(ServiceMessagePattern.SAVE)
  async save(@Payload() created: DeepPartial<Service>) {
    return {
      data: await this.servicesService.save(created)
    };
  }

  @MessagePattern(ServiceMessagePattern.FIND_ALL)
  async findAll(@Payload() pageOptionsDto: PageOptionsDto) {
    return await this.servicesService.getAll(pageOptionsDto)
  }

  @MessagePattern(ServiceMessagePattern.FIND_ONE_BY_ID)
  async findOne(@Payload() id: number) {
    return {
      data: await this.servicesService.findOneById(id)
    };
  }

  @MessagePattern(ServiceMessagePattern.UPDATE)
  async update(@Payload() payload: { id: number; dto: UpdateServiceDto }) {
    const { id, dto } = payload;
    return {
      data: await this.servicesService.update(id, dto)
    };
  }
}

