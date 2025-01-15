import { Module } from "@nestjs/common";
import { ServicesModule } from "./services/services.module";
import { ServiceRequestsModule } from "./service-requests/serivce-requests.module";
import { FeedbacksModule } from "./feedbacks/feedbacks.module";
import { OrdersModule } from "./orders/orders.module";

@Module({
  imports: [
    ServicesModule,
    ServiceRequestsModule,
    FeedbacksModule,
    OrdersModule
  ]
})
export class SecurityServiceHubFeatureModule { }
