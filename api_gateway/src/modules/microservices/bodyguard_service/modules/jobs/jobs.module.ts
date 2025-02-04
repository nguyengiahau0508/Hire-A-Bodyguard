import { Module } from "@nestjs/common";
import { BodyguardServiceProviderModule } from "../../providers/provider.module";
import { JobsService } from "./jobs.service";
import { JobsController } from "./jobs.controller";

@Module({
  imports: [
    BodyguardServiceProviderModule
  ],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule { }
