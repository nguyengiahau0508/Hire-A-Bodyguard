import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { OrdersService } from '../orders/orders.service';
import { RpcException } from '@nestjs/microservices';
import { MomoPaymentService } from 'src/integrations/momo-payment/momo-payment.service';
import { generateMomoOrderId } from 'src/integrations/momo-payment/utils/generateMomoOrderId';

@Injectable()
export class TransactionsService extends BaseService<Transaction> {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly orderService: OrdersService,
    private readonly momoPaymentService: MomoPaymentService
  ) {
    super(transactionRepository)
  }

  async createAndSaveToDB(dto: CreateTransactionDto) {
    const order = await this.orderService.findOneById(dto.orderId)
    if (!order) throw new RpcException('order not found')

    const created = this.transactionRepository.create({
      ...dto,
      order
    })

    return await this.transactionRepository.save(created)
  }

  async getLinkPayFromMomo({ id, userInfo }: { id: number, userInfo: { name: string; phoneNumber: string; email: string } }) {
    const transaction = await this.findByCondition({ where: { id }, relations: ['order'] })
    if (!transaction) throw new RpcException('transaction not found')
    const momoOrderId = generateMomoOrderId(String(transaction.id))
    return await this.momoPaymentService.createPayment(transaction.amount, [], userInfo, momoOrderId)
  }
}
