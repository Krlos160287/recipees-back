/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const allowedOrigins = ['http://localhost', 'http://localhost:4200'];
  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin as string) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };

  const corsOptionsDelegate = (req: any, callback: any) => {
    let corsOptions2: cors.CorsOptions = { origin: false };
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
      corsOptions2 = { origin: true }; // reflect (enable) the requested origin in the CORS response
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };

  app.use(cors(corsOptionsDelegate));

  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS ',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With,' +
        ' Content-Type, Accept,' +
        ' Authorization,' +
        ' Access-Control-Allow-Credentials',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  await app.listen(3000);
}
bootstrap();
