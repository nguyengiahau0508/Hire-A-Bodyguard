import { Module } from "@nestjs/common";
import { SecurityServiceHubModule } from "./security_service_hub/security-servcie-hub.module";

@Module({
  imports: [
    SecurityServiceHubModule
  ]
})
export class MicroserviceFeatureModule { } 
