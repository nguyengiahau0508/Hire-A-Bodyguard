import { Module } from "@nestjs/common";
import { BodyguardServiceProviderModule } from "../../providers/provider.module";
import { BodyguardSerivce } from "./bodyguard.service";
import { BodyguardsController } from "./bodyguard.controller";

@Module({
  imports: [
    BodyguardServiceProviderModule
  ],
  providers: [BodyguardSerivce],
  controllers: [BodyguardsController]
})
export class BodyguardModule { }
