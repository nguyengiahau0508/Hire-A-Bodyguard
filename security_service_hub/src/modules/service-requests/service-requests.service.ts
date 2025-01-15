import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { ServiceRequest } from './entities/service-request.entity';
import { ServiceRequestRepository } from './service-request.repository';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { ServicesService } from '../services/services.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ServiceRequestsService extends BaseService<ServiceRequest> {
  constructor(
    private serivceRequestRepository: ServiceRequestRepository,
    private readonly serivcesSerivce: ServicesService
  ) { super(serivceRequestRepository) }

  async createAndSaveToDB(createServiceRequestDto: CreateServiceRequestDto) {
    const service = await this.serivcesSerivce.findOneById(createServiceRequestDto.serviceId)
    if (!service) throw new RpcException("serivceId not found")
    const created = this.serivceRequestRepository.create({
      service: {
        id: createServiceRequestDto.serviceId
      },
      ...createServiceRequestDto
    })

    return await this.serivceRequestRepository.save(created)
  }
}
