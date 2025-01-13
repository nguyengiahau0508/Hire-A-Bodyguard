import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config";
import * as Joi from 'joi'
import { SecurityServiceHubConfigurationService } from "./config.service";
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        SECURITY_SERVICE_HUB_NAME: Joi.string().default('SECURITY_SERVICE_HUB_NAME'),
        SECURITY_SERVICE_HUB_URL: Joi.string().default('http://localhost:3000'),
        SECURITY_SERVICE_HUB_HOST: Joi.string().default('localhost'),
        SECURITY_SERVICE_HUB_PORT: Joi.number().default(3000),
      })
    })
  ],
  providers: [SecurityServiceHubConfigurationService],
  exports: [SecurityServiceHubConfigurationService]
})
export class SecurityServiceHubConfigurationModule { }
