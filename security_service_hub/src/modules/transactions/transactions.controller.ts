import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionMessagePattern } from './enmus/transaction-message-pattern';
import { PageOptionsDto } from 'src/commons/shared/pagination/dtos';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @MessagePattern(TransactionMessagePattern.CREATE_AND_SAVE)
  async createAndSaveToDb(@Payload() dto: CreateTransactionDto) {
    return {
      data: await this.transactionsService.createAndSaveToDB(dto)
    };
  }

  @MessagePattern(TransactionMessagePattern.FIND_ALL)
  findAll(@Payload() pageOptionsDto: PageOptionsDto) {
    return this.transactionsService.getAll(pageOptionsDto)
  }

  @MessagePattern(TransactionMessagePattern.FIND_ONE_BY_ID)
  async findOne(@Payload() id: number) {
    return {
      data: await this.transactionsService.findOneById(id)
    };
  }

  @MessagePattern(TransactionMessagePattern.UPDATE)
  async update(@Payload() payload: { id: number; dto: UpdateTransactionDto }) {
    const { id, dto } = payload;
    return {
      data: await this.transactionsService.update(id, dto)
    };
  }


  @MessagePattern(TransactionMessagePattern.GET_LINK_PAY_FROM_MOMO)
  async getLinkPayFromMomo(
    @Payload() payload: { id: number; userInfo: { name: string; phoneNumber: string; email: string } },
  ): Promise<any> {
    const { id, userInfo } = payload;
    return {
      data: await this.transactionsService.getLinkPayFromMomo({ id, userInfo })
    }
  }
}
