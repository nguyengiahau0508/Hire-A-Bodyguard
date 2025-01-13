
import { Controller } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceMessagePattern } from './enums/service-message-pattern.enum';
import { Service } from './entities/service.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @MessagePattern(ServiceMessagePattern.CREATE)
  create(@Payload() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @MessagePattern(ServiceMessagePattern.SAVE)
  save(@Payload() service: Service) {
    return this.servicesService.save(service);
  }

  @MessagePattern(ServiceMessagePattern.FIND_ALL)
  findAll() {
    return this.servicesService.findAll();
  }

  @MessagePattern(ServiceMessagePattern.FIND_ONE_BY_ID)
  findOne(@Payload() id: number) {
    return this.servicesService.findOneById(id);
  }

  @MessagePattern(ServiceMessagePattern.UPDATE)
  update(@Payload() payload: { id: number; updateServiceDto: UpdateServiceDto }) {
    const { id, updateServiceDto } = payload;
    return this.servicesService.update(id, updateServiceDto);
  }
}

