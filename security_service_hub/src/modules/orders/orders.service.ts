import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { ServiceRequestsService } from '../service-requests/service-requests.service';
import { RpcException } from '@nestjs/microservices';
import { FilesServcie } from '../files/files.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DeepPartial } from 'typeorm';

@Injectable()
export class OrdersService extends BaseService<Order> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly serivceRequestsSerivce: ServiceRequestsService,
    private readonly fileSerivce: FilesServcie
  ) {
    super(orderRepository)
  }

  async createAndSaveToDB(payload: { dto: CreateOrderDto, file: Express.Multer.File }) {
    const { dto, file } = payload
    const serviceRequest = await this.serivceRequestsSerivce.findOneById(dto.serviceRequestId)
    if (!serviceRequest) throw new RpcException('serviceRequestId not found')

    console.log(serviceRequest)

    const serivceRequesOrder = await this.orderRepository.findByCondition({ where: { serviceRequest: { id: serviceRequest.id } } })
    if (serivceRequesOrder) throw new RpcException('order already exists')

    const created = this.orderRepository.create({
      serviceRequest,
      ...dto,
    })

    const fileEntity = await this.fileSerivce.uploadFileToDrive(file)
    return await this.orderRepository.save({
      ...created,
      file: fileEntity
    })
  }

  async customeUpdate(id: number, dto: DeepPartial<Order>, file: Express.Multer.File) {
    const order = await this.repository.findOneById(id);
    if (!order) throw new RpcException(`Order with ID ${id} not found`);

    if (file) {
      const fileEntity = await this.fileSerivce.uploadFileToDrive(file)
      order.file = fileEntity
    }

    Object.assign(order, dto);

    return this.repository.save(order);
  }

}
