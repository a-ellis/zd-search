import { Controller, Get, Query } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { SearchService } from '../../common/search.service';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';
import { OrganizationQueryDto } from './organization.dto';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService, private readonly searchService: SearchService) {}

  @Get()
  findAll() {
    return this.orgService.findAll();
  }

  @Get('search')
  search(@Query() query: OrganizationQueryDto) {
      const { field, value, exact } = query;
      try {
        const findConditions: FindConditions<Organization> = this.searchService.createFindConditions(field, value, exact);
        return this.orgService.search(findConditions);
      } catch (error) {
        throw error;
      }
  }
}
