import { Module } from '@nestjs/common';
import { BodyguardTranningService } from './bodyguard_tranning.service';
import { BodyguardTranningController } from './bodyguard_tranning.controller';

@Module({
  controllers: [BodyguardTranningController],
  providers: [BodyguardTranningService],
})
export class BodyguardTranningModule {}
