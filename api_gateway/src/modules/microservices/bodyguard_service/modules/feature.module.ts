import { Module } from "@nestjs/common";
import { JobsModule } from "./jobs/jobs.module";
import { BodyguardModule } from "./bodyguards/bodyguard.module";

@Module({
  imports: [
    JobsModule,
    BodyguardModule
  ]
})
export class BodyguardServiceFeatureModule { }
