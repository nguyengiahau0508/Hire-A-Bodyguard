import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { Service } from './entities/service.entity';
import { ServiceRepository } from './service.repository';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService extends BaseService<Service> {
  constructor(
    private readonly serviceRepository: ServiceRepository
  ) {
    super(serviceRepository)
  }


  async update(id: number, dto: UpdateServiceDto) {
    const existingEntity = await this.repository.findOneById(id);
    if (!existingEntity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    Object.assign(existingEntity, dto);

    return this.repository.save(existingEntity);
  }
}
