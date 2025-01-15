import { Module } from "@nestjs/common";
import { ServicesModule } from "./services/services.module";
import { ServiceRequestsModule } from "./service-requests/service-requests.module";
import { FeedbacksModule } from "./feedbacks/feedbacks.module";
import { OrdersModule } from "./orders/orders.module";
import { FilesModule } from "./files/files.module";

@Module({
  imports: [
    ServicesModule,
    ServiceRequestsModule,
    FeedbacksModule,
    OrdersModule,
    FilesModule
  ]
})
export class FeatureModule { }
