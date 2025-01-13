
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from 'src/commons/shared/repositories/base.abstract.repository';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceRepository extends BaseAbstractRepository<Service> {
  constructor(@InjectRepository(Service) repository: Repository<Service>) {
    super(repository);
  }
}
