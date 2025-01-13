
import { Inject, Injectable, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateServiceDto } from "./dto/create-service.dto";
import { firstValueFrom } from "rxjs";
import { ServiceName } from "src/modules/microservices/common/enums/service-name/service-name.enum";
import { ServiceMessagePattern } from "src/modules/microservices/common/enums/microservice-message-pattern.enum";
import { IMicroservice } from "src/modules/microservices/common/interfaces/response.interface";
import { MicroserviceStatusCode } from "src/modules/microservices/common/enums/status-response.enum";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";

@Injectable()
export class ServicesService {
  constructor(
    @Inject(ServiceName.SECURITY_SERVICE_HUB) private client: ClientProxy
  ) { }

  async createAndSaveToDb(dto: CreateServiceDto) {
    try {
      const createResponse: IMicroservice = await firstValueFrom(
        this.client.send(ServiceMessagePattern.CREATE, dto)
      );

      if (createResponse.statusCode === MicroserviceStatusCode.ERROR) {
        throw new BadRequestException(createResponse.message);
      }

      const created = createResponse.metadata.data;

      const saveResponse: IMicroservice = await firstValueFrom(
        this.client.send(ServiceMessagePattern.SAVE, created)
      );

      if (saveResponse.statusCode === MicroserviceStatusCode.ERROR) {
        throw new InternalServerErrorException(saveResponse.message);
      }

      return saveResponse.metadata;
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        throw new InternalServerErrorException(
          "An unexpected error occurred while creating and saving the service."
        );
      }
      throw error;
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const findAllResponse: IMicroservice = await firstValueFrom(this.client.send(ServiceMessagePattern.FIND_ALL, pageOptionsDto))
    return findAllResponse.metadata
  }

  async findOneById(id: number) {
    const findOneByIdResponse: IMicroservice = await firstValueFrom(this.client.send(ServiceMessagePattern.FIND_ONE_BY_ID, { id }))
    return findOneByIdResponse.metadata
  }

  async update(id: number, dto: UpdateServiceDto) {
    try {
      const updateResponse: IMicroservice = await firstValueFrom(this.client.send(ServiceMessagePattern.UPDATE, { id, dto }))
      if (updateResponse.statusCode === MicroserviceStatusCode.ERROR) {
        throw new BadRequestException(updateResponse.message)
      }
      return updateResponse.metadata
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        throw new InternalServerErrorException(
          "An unexpected error occurred while creating and saving the service."
        );
      }
      throw error;
    }
  }
}

