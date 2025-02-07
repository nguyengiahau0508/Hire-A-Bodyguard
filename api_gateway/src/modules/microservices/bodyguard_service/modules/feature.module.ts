import { Module } from "@nestjs/common";
import { JobsModule } from "./jobs/jobs.module";
import { BodyguardModule } from "./bodyguards/bodyguard.module";
import { TranningCatalogModule } from "./TranningCatalog/tranning-catalog.module";
import { SalariesModule } from "./Salaries/salaries.module";

@Module({
  imports: [
    JobsModule,
    BodyguardModule,
    TranningCatalogModule,
    SalariesModule
  ]
})
export class BodyguardServiceFeatureModule { }

