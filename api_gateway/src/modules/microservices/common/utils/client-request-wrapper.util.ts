
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { firstValueFrom, Observable } from "rxjs";
import { IMicroservice } from "src/modules/microservices/common/interfaces/response.interface";
import { MicroserviceStatusCode } from "../enums/status-response.enum";

export class ClientRequestWrapper {
  /**
   * Send a request to a microservice and handle errors automatically.
   * @param sendRequest - Observable request to the microservice
   * @param errorMessage - Custom error message for unexpected errors
   * @returns Metadata from the microservice response
   */

  static async sendRequest<T>(
    sendRequest: Observable<IMicroservice>, // Observable đầu vào
    errorMessage: string
  ): Promise<T> { // Generic cho kiểu trả về
    try {
      const response: IMicroservice = await firstValueFrom(sendRequest);

      if (response.statusCode === MicroserviceStatusCode.ERROR) {
        throw new BadRequestException(response.message);
      }

      return response.metadata; // Trả về metadata với kiểu T
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(errorMessage);
    }
  }

}

