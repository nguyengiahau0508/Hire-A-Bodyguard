import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceName } from "src/modules/microservices/common/enums/service-name/service-name.enum";
import { CreateBodyguardDto } from "./dto/create-bodyguard.dto";
import { ClientRequestWrapper } from "src/modules/microservices/common/utils/client-request-wrapper.util";
import { BODYGUARD_MESSAGE } from "src/modules/microservices/common/enums/microservice-message-pattern.enum";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { UpdateBodyguardDto } from "./dto/update-bodyguard.dto";

@Injectable()
export class BodyguardSerivce {
  constructor(
    @Inject(ServiceName.BODYGUARD_SERVICE) private client: ClientProxy
  ) { }

  async createAndSave(dto: CreateBodyguardDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(BODYGUARD_MESSAGE.CREATE_AND_SAVE, dto),
      "An unexpected error occurred while creating the service.")
  }

  async findById(id: number) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(BODYGUARD_MESSAGE
        .FINDONE, id),
      "An unexpected error occurred while creating the service.")
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(BODYGUARD_MESSAGE.FINDALL, pageOptionsDto),
      "An unexpected error occurred while fetching all services."
    );
  }

  async update(id: number, dto: UpdateBodyguardDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(BODYGUARD_MESSAGE.UPDATE, { id, dto }),
      "An unexpected error occurred while fetching all services."
    )
  }

}
