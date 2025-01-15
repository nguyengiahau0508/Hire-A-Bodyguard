import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceName } from "src/modules/microservices/common/enums/service-name/service-name.enum";
import { FeedbackMessagePattern } from "src/modules/microservices/common/enums/microservice-message-pattern.enum";
import { ClientRequestWrapper } from "src/modules/microservices/common/utils/client-request-wrapper.util";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";

@Injectable()
export class FeedbacksService {
  constructor(
    @Inject(ServiceName.SECURITY_SERVICE_HUB) private client: ClientProxy
  ) { }

  async createAndSave(dto: CreateFeedbackDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(FeedbackMessagePattern.CREATE_AND_SAVE, dto),
      "An unexpected error occurred while creating the service.")
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(FeedbackMessagePattern.FIND_ALL, pageOptionsDto),
      "An unexpected error occurred while fetching all services."
    );
  }

  async findOneById(id: number) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(FeedbackMessagePattern.FIND_ONE_BY_ID, { id }),
      "An unexpected error occurred while fetching the service by ID."
    );
  }

  async update(id: number, dto: UpdateFeedbackDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(FeedbackMessagePattern.UPDATE, { id, dto }),
      "An unexpected error occurred while updating the service."
    );
  }
}
