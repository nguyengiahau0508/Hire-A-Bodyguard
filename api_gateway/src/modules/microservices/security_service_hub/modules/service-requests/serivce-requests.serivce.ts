import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceName } from "src/modules/microservices/common/enums/service-name/service-name.enum";
import { CreateServiceRequestDto } from "./dto/create-service-request.dto";
import { ServiceRequestMessagePattern } from "src/modules/microservices/common/enums/microservice-message-pattern.enum";
import { ClientRequestWrapper } from "src/modules/microservices/common/utils/client-request-wrapper.util";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { UpdateServiceRequestDto } from "./dto/update-service-request.dto";

@Injectable()
export class ServiceRequestsService {
  constructor(
    @Inject(ServiceName.SECURITY_SERVICE_HUB) private client: ClientProxy
  ) { }

  async createAndSave(dto: CreateServiceRequestDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(ServiceRequestMessagePattern.CREATE_AND_SAVE, dto),
      "An unexpected error occurred while creating the service.")
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(ServiceRequestMessagePattern.FIND_ALL, pageOptionsDto),
      "An unexpected error occurred while fetching all services."
    );
  }

  async findOneById(id: number) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(ServiceRequestMessagePattern.FIND_ONE_BY_ID, { id }),
      "An unexpected error occurred while fetching the service by ID."
    );
  }

  async update(id: number, dto: UpdateServiceRequestDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(ServiceRequestMessagePattern.UPDATE, { id, dto }),
      "An unexpected error occurred while updating the service."
    );
  }
}
