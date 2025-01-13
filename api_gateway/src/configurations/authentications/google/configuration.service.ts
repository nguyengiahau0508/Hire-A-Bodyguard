import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleAuthConfigurationService {
  constructor(private configurationService: ConfigService) { }

  get clientId(): string {
    return this.configurationService.get<string>('googleAuth.clientId')
  }

  get clientSecret(): string {
    return this.configurationService.get<string>('googleAuth.clientSecret')
  }
}
