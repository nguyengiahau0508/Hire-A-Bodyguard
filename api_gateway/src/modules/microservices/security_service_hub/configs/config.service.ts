import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SecurityServiceHubConfigurationService {
  constructor(private configurationService: ConfigService) { }

  get name(): string {
    return this.configurationService.get<string>('SECURITY_SERVICE_HUB.name');
  }

  get url(): string {
    return this.configurationService.get<string>('SECURITY_SERVICE_HUB.url')
  }

  get port(): number {
    return Number(this.configurationService.get<number>('SECURITY_SERVICE_HUB.port'));
  }

  get host(): string {
    return this.configurationService.get<string>('SECURITY_SERVICE_HUB.host')
  }
}
