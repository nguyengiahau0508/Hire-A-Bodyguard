import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GithubAuthConfigurationService {
  constructor(private configurationService: ConfigService) { }

  get clientId(): string {
    return this.configurationService.get<string>('githubAuth.clientId')
  }

  get clientSecret(): string {
    return this.configurationService.get<string>('githubAuth.clientSecret')
  }
}
