import { Module } from "@nestjs/common";
import { JobsModule } from "./jobs/jobs.module";
import { BodyguardModule } from "./bodyguards/bodyguard.module";
import { TranningCatalogModule } from "./TranningCatalog/tranning-catalog.module";

@Module({
  imports: [
    JobsModule,
    BodyguardModule,
    TranningCatalogModule
  ]
})
export class BodyguardServiceFeatureModule { }

