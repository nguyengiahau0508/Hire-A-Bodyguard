
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from 'src/commons/shared/repositories/base.abstract.repository';
import { ServiceRequest } from './entities/service-request.entity';

@Injectable()
export class ServiceRequestRepository extends BaseAbstractRepository<ServiceRequest> {
  constructor(@InjectRepository(ServiceRequest) repository: Repository<ServiceRequest>) {
    super(repository);
  }
}
