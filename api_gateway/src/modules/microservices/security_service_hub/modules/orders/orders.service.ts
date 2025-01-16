import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceName } from "src/modules/microservices/common/enums/service-name/service-name.enum";
import { OrderMessagePattern } from "src/modules/microservices/common/enums/microservice-message-pattern.enum";
import { ClientRequestWrapper } from "src/modules/microservices/common/utils/client-request-wrapper.util";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ServiceName.SECURITY_SERVICE_HUB) private client: ClientProxy
  ) { }

  async createAndSave(dto: CreateOrderDto, file: Express.Multer.File) {
    //const base64Buffer = file.buffer.toString('base64');
    return await ClientRequestWrapper.sendRequest(
      this.client.send(OrderMessagePattern.CREATE_AND_SAVE, {
        dto,
        file
      }),
      "An unexpected error occurred while creating the service."
    );
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(OrderMessagePattern.FIND_ALL, pageOptionsDto),
      "An unexpected error occurred while fetching all services."
    );
  }

  async findOneById(id: number) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(OrderMessagePattern.FIND_ONE_BY_ID, { id }),
      "An unexpected error occurred while fetching the service by ID."
    );
  }

  async update(id: number, dto: UpdateOrderDto, file: Express.Multer.File) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(OrderMessagePattern.UPDATE, { id, dto, file }),
      "An unexpected error occurred while updating the service."
    );
  }
}
