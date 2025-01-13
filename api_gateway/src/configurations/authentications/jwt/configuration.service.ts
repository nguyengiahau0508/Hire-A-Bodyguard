import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtAuthConfigurationService {
  constructor(private configurationService: ConfigService) { }

  get secret(): string {
    return this.configurationService.get<string>('jwtAuth.secret')
  }

  get accessExpiresIn(): string {
    return this.configurationService.get<string>('jwtAuth.accessExpiresIn')
  }

  get refreshExpiresIn(): string {
    return this.configurationService.get<string>('jwtAuth.refreshExpiresIn')
  }
}
