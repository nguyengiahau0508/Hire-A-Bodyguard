import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceRequestsService } from './service-requests.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
import { ServiceRequestMessagePattern } from './enums/service-request-message-pattern';
import { PageOptionsDto } from 'src/commons/shared/pagination/dtos';

@Controller()
export class ServiceRequestsController {
  constructor(private readonly serviceRequestsService: ServiceRequestsService) { }

  @MessagePattern(ServiceRequestMessagePattern.CREATE_AND_SAVE)
  async createAndSaveToDb(@Payload() dto: CreateServiceRequestDto) {
    return {
      data: await this.serviceRequestsService.createAndSaveToDB(dto)
    };
  }

  @MessagePattern(ServiceRequestMessagePattern.FIND_ALL)
  findAll(@Payload() pageOptionsDto: PageOptionsDto) {
    return this.serviceRequestsService.getAll(pageOptionsDto)
  }

  @MessagePattern(ServiceRequestMessagePattern.FIND_ONE_BY_ID)
  async findOne(@Payload() id: number) {
    return {
      data: await this.serviceRequestsService.findOneById(id)
    };
  }

  @MessagePattern(ServiceRequestMessagePattern.UPDATE)
  async update(@Payload() payload: { id: number; dto: UpdateServiceRequestDto }) {
    const { id, dto } = payload;
    return {
      data: await this.serviceRequestsService.update(id, dto)
    };
  }
}
