import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceName } from "src/modules/microservices/common/enums/service-name/service-name.enum";
import { CreateJobDto } from "./dto/create-job.dto";
import { ClientRequestWrapper } from "src/modules/microservices/common/utils/client-request-wrapper.util";
import { JOB_MESSAGE } from "src/modules/microservices/common/enums/microservice-message-pattern.enum";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { UpdateJobDto } from "./dto/update-job.dto";

@Injectable()
export class JobsService {
  constructor(
    @Inject(ServiceName.BODYGUARD_SERVICE) private client: ClientProxy
  ) { }

  async createAndSave(dto: CreateJobDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(JOB_MESSAGE.CREATE_AND_SAVE, dto),
      "An unexpected error occurred while creating the service.")
  }

  async findById(id: number) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(JOB_MESSAGE.FINDONE, id),
      "An unexpected error occurred while creating the service.")
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(JOB_MESSAGE.FINDALL, pageOptionsDto),
      "An unexpected error occurred while fetching all services."
    );
  }

  async update(id: number, dto: UpdateJobDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(JOB_MESSAGE.UPDATE, { id, dto }),
      "An unexpected error occurred while fetching all services."
    )
  }
}
