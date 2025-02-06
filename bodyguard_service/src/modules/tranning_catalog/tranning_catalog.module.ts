import { Module } from '@nestjs/common';
import { TranningCatalogService } from './tranning_catalog.service';
import { TranningCatalogController } from './tranning_catalog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingCatalog } from './entities/tranning_catalog.entity';
import { TranningCatalogRepository } from './tranning_catalog.repository';
import { TrainingDayModule } from '../training-day/training-day.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingCatalog]), TrainingDayModule],
  controllers: [TranningCatalogController],
  providers: [TranningCatalogService, TranningCatalogRepository],
})
export class TranningCatalogModule { }
