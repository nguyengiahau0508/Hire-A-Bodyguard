import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderMessagePattern } from './enums/order-message-pattren';
import { PageOptionsDto } from 'src/commons/shared/pagination/dtos';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @MessagePattern(OrderMessagePattern.CREATE_AND_SAVE)
  async createAndSaveToDb(@Payload() payload: { dto: CreateOrderDto; file: Express.Multer.File }) {
    return {
      data: await this.ordersService.createAndSaveToDB(payload),
    };
  }

  @MessagePattern(OrderMessagePattern.FIND_ALL)
  findAll(@Payload() pageOptionsDto: PageOptionsDto) {
    return this.ordersService.getAll(pageOptionsDto, ['file'])
  }

  @MessagePattern(OrderMessagePattern.FIND_ONE_BY_ID)
  async findOne(@Payload() id: number) {
    return {
      data: await this.ordersService.findOneById(id)
    };
  }

  @MessagePattern(OrderMessagePattern.UPDATE)
  async update(@Payload() payload: { id: number; dto: UpdateOrderDto, file: Express.Multer.File }) {
    const { id, dto } = payload;
    return {
      data: await this.ordersService.update(id, dto)
    };
  }
}
