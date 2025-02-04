import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class MariadbConfigurationService {
  constructor(private configService: ConfigService) { }

  get host(): string {
    return this.configService.get<string>('mariadb.host');
  }

  get port(): number {
    return this.configService.get<number>('mariadb.port');
  }

  get username(): string {
    return this.configService.get<string>('mariadb.username');
  }

  get password(): string {
    return this.configService.get<string>('mariadb.password');
  }

  get dbName(): string {
    return this.configService.get<string>('mariadb.name')
  }
}
