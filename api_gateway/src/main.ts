import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicaitionConfigurationService } from './configurations/application/configuration.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .addOAuth2()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // get app config for cors serttings and starting the app.
  const applicationConfiguration: ApplicaitionConfigurationService = app.get(ApplicaitionConfigurationService)

  await app.listen(applicationConfiguration.port, applicationConfiguration.host, () => {
    console.log(`${applicationConfiguration.name} is running on:`, {
      host: applicationConfiguration.host,
      port: applicationConfiguration.port
    });
    console.log(`Swagger running at: http://${applicationConfiguration.host}:${applicationConfiguration.port}/api`);
  });
}

bootstrap();
