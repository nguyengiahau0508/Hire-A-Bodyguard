
import { Body, NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { deleteEmptyFields } from '../utils/deleteEmptyFields';

@Injectable()
export class DeleteEmptyFieldsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.body) {
      deleteEmptyFields(request.body); // Gọi hàm xóa trường rỗng
    }
    return next.handle();
  }
}
