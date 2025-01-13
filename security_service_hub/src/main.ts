import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

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

  console.log('security_service_hub running at: ', {
    host, port
  })

  console.log("The Swagger documentation for this service is currently unavailable. Please check back later or contact the development team for more details.")

  await app.listen()
}
bootstrap();
