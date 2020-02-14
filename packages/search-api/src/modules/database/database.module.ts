import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoConnectionOptions } from './config/mongo.config';

@Module({
  imports: [ TypeOrmModule.forRoot(mongoConnectionOptions) ]
})
export class DatabaseModule {}
