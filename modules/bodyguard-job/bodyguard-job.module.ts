import { Module } from '@nestjs/common';
import { BodyguardJobService } from './bodyguard-job.service';
import { BodyguardJobController } from './bodyguard-job.controller';

@Module({
  controllers: [BodyguardJobController],
  providers: [BodyguardJobService],
})
export class BodyguardJobModule {}
