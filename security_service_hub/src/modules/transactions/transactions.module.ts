import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { OrdersModule } from '../orders/orders.module';
import { MomoPaymentModule } from 'src/integrations/momo-payment/momo-payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    OrdersModule,
    MomoPaymentModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionRepository],
})
export class TransactionsModule { }
