
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from 'src/commons/shared/repositories/base.abstract.repository';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderRepository extends BaseAbstractRepository<Order> {
  constructor(@InjectRepository(Order) repository: Repository<Order>) {
    super(repository);
  }
}
