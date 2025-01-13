import { Module } from "@nestjs/common";
import { SecurityServiceHubFeatureModule } from "./modules/feature.module";


@Module({
  imports: [
    SecurityServiceHubFeatureModule
  ]
})
export class SecurityServiceHubModule { }
