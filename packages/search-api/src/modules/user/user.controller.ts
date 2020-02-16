import { Controller, Get, Query } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { SearchService } from '../../common/search.service';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly searchService: SearchService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('search')
  search(@Query('field') field: string, @Query('value') value: string, @Query('exact') exact?: string) {
    try {
      const findConditions: FindConditions<User> = this.searchService.createFindConditions(field, value, exact);
      return this.userService.search(findConditions);
    } catch (error) {
      throw error;
    }
  }
}
