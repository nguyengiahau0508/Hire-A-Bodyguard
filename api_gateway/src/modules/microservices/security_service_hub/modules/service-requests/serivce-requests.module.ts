
import { Module } from "@nestjs/common";
import { SecurityServiceHubProviderModule } from "../../providers/provider.module";
import { ServiceRequestsService } from "./serivce-requests.serivce";
import { ServiceRequestsController } from "./serivce-requests.controller";

@Module({
  imports: [
    SecurityServiceHubProviderModule
  ],
  exports: [ServiceRequestsService],
  providers: [ServiceRequestsService],
  controllers: [ServiceRequestsController]
})
export class ServiceRequestsModule { }
