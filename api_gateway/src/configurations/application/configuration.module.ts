import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";
import * as Joi from 'joi'
import { ApplicaitionConfigurationService } from "./configuration.service";
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('CODE-RANK'),
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_HOST: Joi.string().default('localhost'),
        APP_PORT: Joi.number().default(3000),
      })
    })
  ],
  providers: [ApplicaitionConfigurationService],
  exports: [ApplicaitionConfigurationService]
})
export class ApplicationConfigurationModule { }
