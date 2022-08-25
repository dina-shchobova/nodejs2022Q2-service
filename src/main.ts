import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import 'dotenv/config';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');

  const document = parse(DOC_API);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      validatorPackage: require('@nestjs/class-validator'),
      // transformerPackage: require('@nestjs/class-transformer'),
    }),
  );
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}
bootstrap();
