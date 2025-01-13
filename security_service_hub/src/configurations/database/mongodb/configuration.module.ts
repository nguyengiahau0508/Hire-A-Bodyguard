import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";
import * as Joi from 'joi'
import { MongoDBConfigurationService } from "./configuration.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MONGODB_DB_URL: Joi.string().required(),
      })
    })
  ],
  providers: [MongoDBConfigurationService],
  exports: [MongoDBConfigurationService]
})

export class MongodbConfigurationModule { }
