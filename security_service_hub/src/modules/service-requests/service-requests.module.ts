import { Module } from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';
import { ServiceRequestsController } from './service-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRequest } from './entities/service-request.entity';
import { ServiceRequestRepository } from './service-request.repository';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRequest]),
    ServicesModule
  ],
  controllers: [ServiceRequestsController],
  providers: [ServiceRequestsService, ServiceRequestRepository],
  exports: [ServiceRequestsService]
})
export class ServiceRequestsModule { }
