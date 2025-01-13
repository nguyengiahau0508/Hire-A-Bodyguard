import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { Service } from './entities/service.entity';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServicesService extends BaseService<Service> {
  constructor(
    private readonly serviceRepository: ServiceRepository
  ) {
    super(serviceRepository)
  }
}
