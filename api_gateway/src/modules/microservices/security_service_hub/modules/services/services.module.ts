import { Module } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { ServicesController } from "./services.controller";
import { SecurityServiceHubProviderModule } from "../../providers/provider.module";

@Module({
  imports: [
    SecurityServiceHubProviderModule
  ],
  exports: [ServicesService],
  providers: [ServicesService],
  controllers: [ServicesController]
})
export class ServicesModule { }
