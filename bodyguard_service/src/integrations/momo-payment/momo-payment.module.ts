import { Module } from "@nestjs/common";
import { MomoPaymentService } from "./momo-payment.service";
import { MomoConfigModule } from "./config/config.module";


@Module({
  imports: [MomoConfigModule],
  providers: [MomoPaymentService],
  exports: [MomoPaymentService]
})
export class MomoPaymentModule { }
