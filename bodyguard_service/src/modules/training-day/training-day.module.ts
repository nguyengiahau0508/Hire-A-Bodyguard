import { Module } from '@nestjs/common';
import { TrainingDayService } from './training-day.service';
import { TrainingDayController } from './training-day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingDay } from './entities/training-day.entity';
import { TranningDayRepository } from './tranning-day.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingDay])],
  controllers: [TrainingDayController],
  providers: [TrainingDayService, TranningDayRepository],
  exports: [TrainingDayService]
})
export class TrainingDayModule { }
