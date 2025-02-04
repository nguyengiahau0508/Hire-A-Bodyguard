import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BodyguardServiceConfigurationService {
  constructor(private configurationService: ConfigService) { }

  get name(): string {
    return this.configurationService.get<string>('BODYGUARD_SERVICE.name');
  }

  get url(): string {
    return this.configurationService.get<string>('BODYGUARD_SERVICE.url')
  }

  get port(): number {
    return Number(this.configurationService.get<number>('BODYGUARD_SERVICE.port'));
  }

  get host(): string {
    return this.configurationService.get<string>('BODYGUARD_SERVICE.host')
  }
}
