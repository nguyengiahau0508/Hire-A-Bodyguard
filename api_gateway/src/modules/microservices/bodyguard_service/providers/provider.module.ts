
import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ServiceName } from "../../common/enums/service-name/service-name.enum";
import { BodyguardServiceConfigurationModule } from "../configs/config.module";
import { BodyguardServiceConfigurationService } from "../configs/config.service";

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [BodyguardServiceConfigurationModule],
        name: ServiceName.BODYGUARD_SERVICE,
        useFactory: async (config: BodyguardServiceConfigurationService) => ({
          transport: Transport.TCP,
          options: {
            port: config.port,
            host: config.host,
          },
        }),
        inject: [BodyguardServiceConfigurationService],
      },
    ]),
    BodyguardServiceConfigurationModule,
  ],
  exports: [ClientsModule],
})
export class BodyguardServiceProviderModule { }

