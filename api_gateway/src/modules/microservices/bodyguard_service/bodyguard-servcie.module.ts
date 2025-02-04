import { Module } from "@nestjs/common";
import { BodyguardServiceFeatureModule } from "./modules/feature.module";


@Module({
  imports: [
    BodyguardServiceFeatureModule
  ]
})
export class BodyguardServiceModule { }
