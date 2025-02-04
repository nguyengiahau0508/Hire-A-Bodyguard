import { Module } from "@nestjs/common";
import { SecurityServiceHubModule } from "./security_service_hub/security-servcie-hub.module";
import { BodyguardServiceModule } from "./bodyguard_service/bodyguard-servcie.module";

@Module({
  imports: [
    SecurityServiceHubModule,
    BodyguardServiceModule
  ]
})
export class MicroserviceFeatureModule { } 
