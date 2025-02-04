import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/shared/base.service';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { ServiceRequestsService } from '../service-requests/service-requests.service';
import { RpcException } from '@nestjs/microservices';
import { FilesServcie } from '../files/files.service';
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
    const serviceRequest = await this.serivceRequestsSerivce.findByCondition({ where: { id: dto.serviceRequestId }, relations: ['service'] })
    if (!serviceRequest) throw new RpcException('Service request not found')

    const service = serviceRequest.service
    if (!service) throw new RpcException('service not found')

    const serivceRequesOrder = await this.orderRepository.findByCondition({ where: { serviceRequest: { id: serviceRequest.id } } })
    if (serivceRequesOrder) throw new RpcException('order already exists')

    const totalAmount = service.price * serviceRequest.numberOfGuards * serviceRequest.numberOfHours

    const created = this.orderRepository.create({
      serviceRequest,
      totalAmount,
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
