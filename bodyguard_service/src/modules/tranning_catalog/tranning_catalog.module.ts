import { Module } from '@nestjs/common';
import { TranningCatalogService } from './tranning_catalog.service';
import { TranningCatalogController } from './tranning_catalog.controller';

@Module({
  controllers: [TranningCatalogController],
  providers: [TranningCatalogService],
})
export class TranningCatalogModule {}
