import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { EmployeeModule } from './employee/employee.module';

async function bootstrap() {
  const port = new ConfigService().get('port') || 4001;
  const app = await NestFactory.createMicroservice(EmployeeModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port,
    },
  } as TcpOptions);
  await app.listen();
  Logger.log(`🚀 Application is running on: http://localhost:${port}}`);
}
bootstrap();
