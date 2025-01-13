import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoDBConfigurationService } from "src/configurations/database/mongodb/configuration.service";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { MongodbConfigurationModule } from "src/configurations/database/mongodb/configuration.module";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongodbConfigurationModule],
      useFactory: async (mongodbConfigurationService: MongoDBConfigurationService) => {
        return { uri: mongodbConfigurationService.mongodbUrl }
      },
      inject: [MongoDBConfigurationService]
    } as MongooseModuleAsyncOptions)
  ]
})
export default class MongoDBProviderModule { }
