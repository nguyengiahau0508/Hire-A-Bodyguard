import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceName } from "src/modules/microservices/enums/service-name/service-name.enum";
import { CreateServiceDto } from "./dto/create-service.dto";
import { ServiceMessagePattern } from "src/modules/microservices/enums/microservice-message-pattern.enum";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ServicesService {
  constructor(
    @Inject(ServiceName.SECURITY_SERVICE_HUB) private client: ClientProxy
  ) { }

  async createAndSaveToDb(dto: CreateServiceDto) {
    const createdService = await firstValueFrom(
      this.client.send(ServiceMessagePattern.CREATE, dto)
    );
    return firstValueFrom(
      this.client.send(ServiceMessagePattern.SAVE, createdService)
    );
  }
}
