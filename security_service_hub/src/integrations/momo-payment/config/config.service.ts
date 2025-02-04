import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MomoConfigService {
  constructor(private configurationService: ConfigService) { }

  get accessKey(): string {
    return this.configurationService.get<string>('momo.accessKey');
  }

  get secretKey(): string {
    return this.configurationService.get<string>('momo.secretKey');
  }

  get partnerCode(): string {
    return this.configurationService.get<string>('momo.partnerCode');
  }

  get redirectUrl(): string {
    return this.configurationService.get<string>('momo.redirectUrl');
  }

  get ipnUrl(): string {
    return this.configurationService.get<string>('momo.ipnUrl');
  }
}

