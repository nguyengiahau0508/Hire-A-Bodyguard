import { Module } from "@nestjs/common";
import { SecurityServiceHubProviderModule } from "../../providers/provider.module";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";

@Module({
  imports: [
    SecurityServiceHubProviderModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionModule { }
