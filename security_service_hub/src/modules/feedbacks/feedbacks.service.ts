import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { Feedback } from './entities/feedback.entity';
import { FeedbackRepository } from './feedback.repository';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ServiceRequestsService } from '../service-requests/service-requests.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class FeedbacksService extends BaseService<Feedback> {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly serviceRequestService: ServiceRequestsService
  ) {
    super(feedbackRepository)
  }

  async createAndSaveToDB(dto: CreateFeedbackDto) {
    const serviceRequest = await this.serviceRequestService.findOneById(dto.serviceRequestId)
    if (!serviceRequest) throw new RpcException('serviceRequestId not found')

    const created = this.feedbackRepository.create({
      serviceRequest,
      ...dto
    })

    return await this.feedbackRepository.save(created)
  }
}
