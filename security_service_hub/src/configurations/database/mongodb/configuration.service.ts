import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class MongoDBConfigurationService {
  constructor(private configService: ConfigService) { }

  get mongodbUrl(): string {
    return this.configService.get<string>('mongodb.mongodbUrl')
  }
}
