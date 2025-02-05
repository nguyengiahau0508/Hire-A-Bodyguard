import { Module } from '@nestjs/common';
import { BodyguardService } from './bodyguard.service';
import { BodyguardController } from './bodyguard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bodyguard } from './entities/bodyguard.entity';
import { BodyguardRepository } from './bodyguard.repository';
import { JobModule } from '../job/job.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bodyguard]), JobModule],
  controllers: [BodyguardController],
  providers: [BodyguardService, BodyguardRepository],
})
export class BodyguardModule { }
