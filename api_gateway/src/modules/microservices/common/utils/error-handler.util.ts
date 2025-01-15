
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { IMicroservice } from "src/modules/microservices/common/interfaces/response.interface";

export class ErrorHandler {
  static handleMicroserviceError(response: IMicroservice) {
    if (response.statusCode === "ERROR") {
      throw new BadRequestException(response.message);
    }
  }

  static handleUnexpectedError(error: any, customMessage: string) {
    if (!(error instanceof BadRequestException)) {
      throw new InternalServerErrorException(customMessage);
    }
    throw error;
  }
}
