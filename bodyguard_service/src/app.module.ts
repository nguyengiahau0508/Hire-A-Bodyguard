import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseProviderModule } from './providers/database/database.provider.module';
import { FeatureModule } from './modules/feature.module';

@Module({
  imports: [
    FeatureModule,
    DatabaseProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
