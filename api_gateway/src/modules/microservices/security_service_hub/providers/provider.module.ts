
import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { SecurityServiceHubConfigurationService } from "../configs/config.service";
import { SecurityServiceHubConfigurationModule } from "../configs/config.module";
import { ServiceName } from "../../common/enums/service-name/service-name.enum";

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [SecurityServiceHubConfigurationModule],
        name: ServiceName.SECURITY_SERVICE_HUB,
        useFactory: async (config: SecurityServiceHubConfigurationService) => ({
          transport: Transport.TCP,
          options: {
            port: config.port,
            host: config.host,
          },
        }),
        inject: [SecurityServiceHubConfigurationService],
      },
    ]),
    SecurityServiceHubConfigurationModule,
  ],
  exports: [ClientsModule],
})
export class SecurityServiceHubProviderModule { }

