import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SearchService } from '../../common/search.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, SearchService],
  controllers: [UserController]
})
export class UserModule {}
