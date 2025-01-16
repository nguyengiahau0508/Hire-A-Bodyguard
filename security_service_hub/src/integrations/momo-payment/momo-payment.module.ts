import { Module } from "@nestjs/common";
import { MomoPaymentService } from "./momo-payment.service";


@Module({
  imports: [],
  providers: [MomoPaymentService],
  exports: [MomoPaymentService]
})
export class MomoPaymentModule { }
