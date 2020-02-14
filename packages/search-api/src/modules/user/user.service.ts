import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, FindConditions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  search(findConditions: FindConditions<User>): Promise<User[]> {
    return this.userRepo.find(findConditions);
  }
}
