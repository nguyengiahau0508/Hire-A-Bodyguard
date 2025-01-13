import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'
import configuration from './configuration';
import { GoogleAuthConfigurationService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required()
      })
    })
  ],
  providers: [GoogleAuthConfigurationService],
  exports: [GoogleAuthConfigurationService]
})
export class GoogleAuthConfigurationModule { }
