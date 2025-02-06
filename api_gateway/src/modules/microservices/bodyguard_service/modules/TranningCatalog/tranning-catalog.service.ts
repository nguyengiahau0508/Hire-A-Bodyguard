import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceName } from "src/modules/microservices/common/enums/service-name/service-name.enum";
import { CreateTranningCatalogDto } from "./dto/create-tranning_catalog.dto";
import { ClientRequestWrapper } from "src/modules/microservices/common/utils/client-request-wrapper.util";
import { TRANNING_CATALOG } from "src/modules/microservices/common/enums/microservice-message-pattern.enum";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { UpdateTranningCatalogDto } from "./dto/update-tranning_catalog.dto";

@Injectable()
export class TranningCatalogService {
  constructor(
    @Inject(ServiceName.BODYGUARD_SERVICE) private readonly client: ClientProxy
  ) { }

  async createAndSave(dto: CreateTranningCatalogDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(TRANNING_CATALOG.CREATE_AND_SAVE, { dto }),
      "An unexpected error occurred while creating the service.")
  }

  async findById(id: number) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(TRANNING_CATALOG
        .FINDONE, { id }),
      "An unexpected error occurred while creating the service.")
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(TRANNING_CATALOG.FINDALL, { pageOptionsDto }),
      "An unexpected error occurred while fetching all services."
    );
  }

  async update(id: number, dto: UpdateTranningCatalogDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(TRANNING_CATALOG.UPDATE, { id, dto }),
      "An unexpected error occurred while fetching all services."
    )
  }
}
