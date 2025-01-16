import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ServiceName } from "src/modules/microservices/common/enums/service-name/service-name.enum";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { ClientRequestWrapper } from "src/modules/microservices/common/utils/client-request-wrapper.util";
import { TransactionMessagePattern } from "src/modules/microservices/common/enums/microservice-message-pattern.enum";
import { PageOptionsDto } from "src/common/shared/pagination/dtos";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { User } from "src/modules/mariadb/users/entities/user.entity";

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(ServiceName.SECURITY_SERVICE_HUB) private client: ClientProxy
  ) { }

  async createAndSaveToDb(dto: CreateTransactionDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(TransactionMessagePattern.CREATE_AND_SAVE, dto),
      "An unexpected error occurred while creating the service.")
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(TransactionMessagePattern.FIND_ALL, pageOptionsDto),
      "An unexpected error occurred while fetching all services."
    );
  }

  async findOneById(id: number) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(TransactionMessagePattern.FIND_ONE_BY_ID, { id }),
      "An unexpected error occurred while fetching the service by ID."
    );
  }

  async update(id: number, dto: UpdateTransactionDto) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(TransactionMessagePattern.UPDATE, { id, dto }),
      "An unexpected error occurred while updating the service."
    );
  }

  async createPayment(id: number, user: User) {
    return await ClientRequestWrapper.sendRequest(
      this.client.send(
        TransactionMessagePattern.GET_LINK_PAY_FROM_MOMO,
        { id, userInfo: { ...user } }
      ),
      "An unexpected error occurred while updating the service."
    );
  }
}
