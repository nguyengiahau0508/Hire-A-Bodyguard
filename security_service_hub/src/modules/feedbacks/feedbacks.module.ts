import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { FeedbackRepository } from './feedback.repository';
import { ServiceRequestsModule } from '../service-requests/service-requests.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback]),
    ServiceRequestsModule
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService, FeedbackRepository]
})
export class FeedbacksModule { }
