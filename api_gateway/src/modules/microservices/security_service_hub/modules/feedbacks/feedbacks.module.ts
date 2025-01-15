import { Module } from "@nestjs/common";
import { SecurityServiceHubProviderModule } from "../../providers/provider.module";
import { FeedbacksService } from "./feedbacks.service";
import { FeedbacksController } from "./feedbacks.controller";

@Module({
  imports: [
    SecurityServiceHubProviderModule
  ],
  providers: [FeedbacksService],
  controllers: [FeedbacksController]
})
export class FeedbacksModule { }
