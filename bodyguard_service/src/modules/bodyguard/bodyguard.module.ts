import { Module } from '@nestjs/common';
import { BodyguardService } from './bodyguard.service';
import { BodyguardController } from './bodyguard.controller';

@Module({
  controllers: [BodyguardController],
  providers: [BodyguardService],
})
export class BodyguardModule {}
