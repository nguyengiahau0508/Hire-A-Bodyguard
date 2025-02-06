import { Module } from "@nestjs/common";
import { BodyguardServiceProviderModule } from "../../providers/provider.module";
import { TranningCatalogController } from "./tranning-catalog.controller";
import { TranningCatalogService } from "./tranning-catalog.service";

@Module({
  imports: [BodyguardServiceProviderModule],
  controllers: [TranningCatalogController],
  providers: [TranningCatalogService]
})
export class TranningCatalogModule { }
