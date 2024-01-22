/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { IngredientesModule } from './modules/categoria/categoria.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './services/auth.service';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB_MAIN}?${process.env.MONGODB_EXTRA}`),
  IngredientesModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
