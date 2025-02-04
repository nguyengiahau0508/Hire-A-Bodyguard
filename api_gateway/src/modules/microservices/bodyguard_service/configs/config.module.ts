import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config";
import * as Joi from 'joi'
import { BodyguardServiceConfigurationService } from "./config.service";
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        BODYGUARD_SERVICE_NAME: Joi.string().default('BODYGUARD_SERVICE_NAME'),
        BODYGUARD_SERVICE_URL: Joi.string().default('http://localhost:3001'),
        BODYGUARD_SERVICE_HOST: Joi.string().default('localhost'),
        BODYGUARD_SERVICE_PORT: Joi.number().default(3001),
      })
    })
  ],
  providers: [BodyguardServiceConfigurationService],
  exports: [BodyguardServiceConfigurationService]
})
export class BodyguardServiceConfigurationModule { }
