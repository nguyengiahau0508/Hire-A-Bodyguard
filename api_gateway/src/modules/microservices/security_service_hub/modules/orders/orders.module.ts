import { Module } from "@nestjs/common";
import { SecurityServiceHubProviderModule } from "../../providers/provider.module";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";

@Module({
  imports: [
    SecurityServiceHubProviderModule
  ],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule { }
