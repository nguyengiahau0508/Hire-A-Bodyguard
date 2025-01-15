
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateServiceDto } from "./dto/create-service.dto";
import { ServiceName } from "src/modules/microservices/common/enums/service-name/service-name.enum";
import { ServiceMessagePattern } from "src/modules/microservices/common/enums/microservice-message-pattern.enum";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { ClientRequestWrapper } from "src/modules/microservices/common/utils/client-request-wrapper.util";

@Injectable()
export class ServicesService {
  constructor(
    @Inject(ServiceName.SECURITY_SERVICE_HUB) private client: ClientProxy
  ) { }


  async createAndSaveToDb(dto: CreateServiceDto) {
    const created = await ClientRequestWrapper.sendRequest<{ data: any }>(
      this.client.send(ServiceMessagePattern.CREATE, { ...dto }), // this.client.send returns Observable
      "An unexpected error occurred while creating the service."
    );

    return await ClientRequestWrapper.sendRequest(
      this.client.send(ServiceMessagePattern.SAVE, created.data),
      "An unexpected error occurred while saving the service."
    );
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(ServiceMessagePattern.FIND_ALL, pageOptionsDto),
      "An unexpected error occurred while fetching all services."
    );
  }

  async findOneById(id: number) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(ServiceMessagePattern.FIND_ONE_BY_ID, { id }),
      "An unexpected error occurred while fetching the service by ID."
    );
  }

  async update(id: number, dto: UpdateServiceDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(ServiceMessagePattern.UPDATE, { id, dto }),
      "An unexpected error occurred while updating the service."
    );
  }
}

