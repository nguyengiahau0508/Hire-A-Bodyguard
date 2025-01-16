import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { Feedback } from './entities/feedback.entity';
import { FeedbackRepository } from './feedback.repository';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ServiceRequestsService } from '../service-requests/service-requests.service';
import { RpcException } from '@nestjs/microservices';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

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


  async customUpdate(id: number, dto: UpdateFeedbackDto) {
    const feedback = await this.repository.findOneById(id);

    if (!feedback) throw new RpcException(`Feedback with ID ${id} not found`);
    if (feedback.userId != dto.userId) throw new RpcException(`You are not allowed to access this resource`)

    Object.assign(feedback, dto);

    return this.feedbackRepository.save(feedback);
  }

}
