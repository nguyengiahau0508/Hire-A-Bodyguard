import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/commons/shared/repositories/base.abstract.repository";
import { Transaction } from "./entities/transaction.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TransactionRepository extends BaseAbstractRepository<Transaction> {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>
  ) {
    super(transactionRepository)
  }
}
