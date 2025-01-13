import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from './providers/database/database.provider.module';
import { AuthModule } from './authentications/auth.module';
import { ApplicationConfigurationModule } from './configurations/application/configuration.module';
import { FeatureModule } from './modules/feature.module';
@Module({
  imports: [
    ApplicationConfigurationModule,
    DatabaseProviderModule,
    FeatureModule,
    AuthModule,
  ],
})
export class AppModule { }
