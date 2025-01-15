import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FeedbackMessagePattern } from './enums/feedback-request-message-pattern';
import { PageOptionsDto } from 'src/commons/shared/pagination/dtos';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) { }

  @MessagePattern(FeedbackMessagePattern.CREATE_AND_SAVE)
  async createAndSaveToDb(@Payload() dto: CreateFeedbackDto) {
    return {
      data: await this.feedbacksService.createAndSaveToDB(dto)
    };
  }

  @MessagePattern(FeedbackMessagePattern.FIND_ALL)
  findAll(@Payload() pageOptionsDto: PageOptionsDto) {
    return this.feedbacksService.getAll(pageOptionsDto)
  }

  @MessagePattern(FeedbackMessagePattern.FIND_ONE_BY_ID)
  async findOne(@Payload() id: number) {
    return {
      data: await this.feedbacksService.findOneById(id)
    };
  }

  @MessagePattern(FeedbackMessagePattern.UPDATE)
  async update(@Payload() payload: { id: number; dto: UpdateFeedbackDto }) {
    const { id, dto } = payload;
    return {
      data: await this.feedbacksService.update(id, dto)
    };
  }
}
