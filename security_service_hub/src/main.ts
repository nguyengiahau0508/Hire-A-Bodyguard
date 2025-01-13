import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, RpcException, Transport } from '@nestjs/microservices';
import { CustomRpcExceptionFilter } from './commons/exceptions/rpc-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { RpcResponseInterceptor } from './commons/interceptors/rpc-response.interceptor';

async function bootstrap() {
  const host = process.env.APP_HOST || 'localhost'
  const port = Number(process.env.APP_PORT) || 3000

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port
      }
    }
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(err => `${err.property} - ${Object.values(err.constraints).join(', ')}`);
        return new RpcException(messages.join('; '));
      },
    }),
  );
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.useGlobalInterceptors(new RpcResponseInterceptor());

  await app.listen()

  console.log('security_service_hub running at: ', {
    host, port
  })
  console.log("The Swagger documentation for this service is currently unavailable. Please check back later or contact the development team for more details.")
}
bootstrap();
